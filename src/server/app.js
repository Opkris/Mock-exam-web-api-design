const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const repository_monday = require("./repository");
const path = require('path');

const authApi = require('./routes/auth-api');
const Users = require('./db/users');

const WsHandler = require('./ws-handler');


const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

WsHandler.init(app);


app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));




passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());


app.get('/api/meals', (req, res) => {

    /*
        Read the query parameters, if any, eg:

        http://localhost:8080/api/books?since=2001
     */
    const since = req.query["since"];

    if (since) {
        res.json(repository_monday.getAllBooksSince(since));
    } else {
        res.json(repository_monday.getAllMeals());
    }
});

/*
    Note the use of ":" to represent a variable placeholder.
    Here we return a specific book with a specific id, eg
    "http://localhost:8080/books/42"
 */
app.get('/api/meals/:id', (req, res) => {

    const book = repository_monday.getMeal(req.params["id"]);

    if (!book) {
        res.status(404);
        res.send()
    } else {
        res.json(book);
    }
    /*
        Either "send()" or "json()" needs to be called, otherwise the
        call of the API will hang waiting for the HTTP response.
        The "json()" also setups the other needed headers related to the
        body, eg things like content-type and content-length
     */
});

/*
    Handle HTTP DELETE request on a book specified by id
 */
app.delete('/api/meals/:id', (req, res) => {

    const deleted = repository_monday.deleteMeal(req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        //this can happen if book already deleted or does not exist
        res.status(404);
    }
    res.send();
});

/*
    Create a new book. The id will be chosen by the server.
    Such method should return the "location" header telling
    where such book can be retrieved (ie its URL)
 */
app.post('/api/meals', (req, res) => {

    const dto = req.body;

    const id = repository_monday.createNewBook(dto.name, dto.price, dto.allergies);

    res.status(201); //created
    res.header("location", "/api/meals/" + id);
    res.send();
});


/*
    Handle PUT request, which completely replace the resource
    with a new one
 */
app.put('/api/meals/:id', (req, res) => {

    if(req.params.id !== req.body.id){
        res.status(409);
        res.send();
        return;
    }

    const updated = repository_monday.updateMeal(req.body);

    if (updated) {
        res.status(204);
    } else {
        //this can happen if entity did not exist
        res.status(404);
    }
    res.send();
});


/** --------- Routes ---------**/
app.use('/api', authApi);
//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {app};
