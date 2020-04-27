const express = require('express');
const repository = require("./repository");
const bodyParser = require('body-parser');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require("express-session");
const WsHandler = require('./ws-handler');
const authApi = require('./routes/auth-api');
const Users = require('./db/users');

const app = express();
const ews = require('express-ws')(app);
const WS = require('ws');

//to handle JSON payloads
app.use(bodyParser.json());

app.use(express.static('public'));


//***********************************************************//
//*************************** Chat **************************//
//***********************************************************//
let counter = 0;

const messages = [];


app.get('/api/messages', (req, res) => {

    const since = req.query["since"];

    const data = messages;

    if (since) {
        res.json(data.filter(m => m.id > since));
    } else {
        res.json(data);
    }
});


app.post('/api/messages', (req, res) => {

    const dto = req.body;

    const id = counter++ + 10;

    const msg = {id: id, author: dto.author, text: dto.text};

    messages.push(msg);

    res.status(201); //created
    res.send();

    const nclients = ews.getWss().clients.size;
    console.log("Going to broadcast message to " + nclients +" clients");

    ews.getWss().clients.forEach((client) => {
        if (client.readyState === WS.OPEN) {
            const json = JSON.stringify(msg);
            console.log("Broadcasting to client: " + JSON.stringify(msg));
            client.send(json);
        } else {
            console.log("Client not ready");
        }
    });
});


app.ws('/', function(ws, req) {
    console.log('Established a new WS connection');
    const numberOfClients = ews.getWss().clients.size;
    console.log('Going to broadcast message to ' + numberOfClients + ' clients');


    ews.getWss().clients.forEach((client) => {
        if (client.readyState === WS.OPEN) {
            const json = JSON.stringify(msg);

            console.log('Broadcasting to client: ' + JSON.stringify(msg));
            client.send(json);
        } else {
            console.log('Client not ready');
        }
    });

    ews.getWss().clients.forEach((client) => {
        const data = JSON.stringify({userCount: n});

        client.send(data);
    });
});

function clearMessages(){
    //yep, that's how you "clear" an array in JS...
    messages.length = 0;
}

//***********************************************************//

// WsHandler.init(app);
0

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


//***********************************************************//
//*********************Drink's and meal's********************//
//***********************************************************//
app.get('/api/meals', (req, res) => {

        res.json(repository.getAllMeals());
});


app.get('/api/drinks', (req, res) => {


        res.json(repository.getAllDrinks());
});

/*
    Note the use of ":" to represent a variable placeholder.
    Here we return a specific book with a specific id, eg
    "http://localhost:8080/books/42"
 */
app.get('/api/meals/:id', (req, res) => {

    const meal = repository.getMeal(req.params["id"]);

    if (!meal) {
        res.status(404);
        res.send()
    } else {
        res.json(meal);
    }
    /*
        Either "send()" or "json()" needs to be called, otherwise the
        call of the API will hang waiting for the HTTP response.
        The "json()" also setups the other needed headers related to the
        body, eg things like content-type and content-length
     */
});

app.get('/api/drinks/:id', (req, res) => {

    const drink = repository.getDrink(req.params["id"]);

    if (!drink) {
        res.status(404);
        res.send()
    } else {
        res.json(drink);
    }

});

/*
    Handle HTTP DELETE request on a book specified by id
 */
app.delete('/api/meals/:id', (req, res) => {

    const deleted = repository.deleteMeal(req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        //this can happen if book already deleted or does not exist
        res.status(404);
    }
    res.send();
});

app.delete('/api/drinks/:id', (req, res) => {

    const deleted = repository.deleteDrink(req.params.id);
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

    const id = repository.createNewMeal(dto.day, dto.name, dto.price, dto.allergies);

    res.status(201); //created
    res.header("location", "/api/meals/" + id);
    res.send();
});


app.post('/api/drinks', (req, res) => {

    const dto = req.body;

    const id = repository.createNewDrink(dto.name, dto.price,);

    res.status(201); //created
    res.header("location", "/api/drinks/" + id);
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

    const updated = repository.updateMeal(req.body);

    if (updated) {
        res.status(204);
    } else {
        //this can happen if entity did not exist
        res.status(404);
    }
    res.send();
});


app.put('/api/drinks/:id', (req, res) => {

    if(req.params.id !== req.body.id){
        res.status(409);
        res.send();
        return;
    }

    const updated = repository.updateDrink(req.body);

    if (updated) {
        res.status(204);
    } else {
        res.status(404);
    }
    res.send();
});


/** --------- Routes ---------**/
app.use('/api', authApi);

//needed to server static files, like HTML, CSS and JS.
// app.use(express.static('public'));


module.exports = {app};
// module.exports = app;

