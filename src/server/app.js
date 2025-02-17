const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const Repository = require('./repository');


Repository.createUser("Kristoffer", "1");
Repository.createUser("Bank", "1");
Repository.createUser("1", "1");
const app = express();

/*
   Note: this could be controlled with an environmental variable
 */
if(false){
    console.log("Using CORS to allow all origins");
    app.use(cors());

    /*
        Even if we allow requests from all origins with
        "Access-Control-Allow-Origin: *"
        (which is what cors() does), it would still block
        requests with authentication (ie cookies).
        Ie, cannot use wildcard * when dealing with authenticated
        requests. We would have to explicitly state the origin (host + port),
        eg, as we did in previous examples:

        app.use(cors({
            origin: 'http://localhost:1234'
        }));
     */
}



//to handle JSON payloads
app.use(bodyParser.json());

//to handle Form POST. "extended" is just to be able to parse all kinds of objects
app.use(bodyParser.urlencoded({extended: true}));

/*
    As we are going to use session-based authentication with
    cookies, we need to tell Express to create new sessions.
    The cookie will store user info, encrypted.
 */
app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));


passport.use(new LocalStrategy(
    /*
        Need to tell which fields represent the  "username" and which the "password".
        This fields will be in a Form or JSON data sent by user when authenticating.
     */
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Repository.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Repository.getUser(userId);
        return done(null, user);
    }
));

/*
    In our server, a user will be represented with some User object,
    which we store in a database, together with its (should-be-hashed) password.
    But, when doing authentication via HTTP, we only use the user id.
    So, we need a way to "serialize" from a User object into a string id,
    and vice-versa (ie, deserialize from string id to User object).
 */
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Repository.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());



// ****************************************************************
// ****************************************************************
// ****************************************************************


app.get('/api/allPokemons', (req, res) => {

    res.json(Repository.getAllPokemons());
});

app.get('/api/randomPokemons', (req, res) => {

    res.json(Repository.getRandomPokemon());
});


app.get('/api/myPokemons', (req, res) => {

    res.json(Repository.getMyPokemon());
});



// ****************************************************************
// ****************************************************************
// ****************************************************************
app.get('/api/pokemon/:id', (req, res) => {

    const pokemon = Repository.getPokemon(req.params["id"]);

    if (!pokemon) {
        res.status(404);
        res.send()
    } else {
        res.json(pokemon);
    }


app.delete('/api/pokemon/:id', (req, res) => {

    const deleted = Repository.deletePokemon(req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        //this can happen if book already deleted or does not exist
        res.status(404);
    }
    res.send();
});

    /*
        Either "send()" or "json()" needs to be called, otherwise the
        call of the API will hang waiting for the HTTP response.
        The "json()" also setups the other needed headers related to the
        body, eg things like content-type and content-length
     */
});

// ****************************************************************
// ****************************************************************
// ****************************************************************

//--- Routes -----------
app.use('/', routes);

//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;
