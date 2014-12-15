var express     = require('express')
  , session     = require('express-session')
  , bcrypt      = require('bcrypt')
  , bodyParser  = require('body-parser')
  , flash       = require('connect-flash')
  , _           = require('lodash')
  , debug       = require('debug');

app = express();
debug('>> Cranking up theCollector!');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: process.env.session_salt,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use(function(req, res, next) {
    req.getUser = function() {
        return req.session.user || false;
    }
    next();
})

app.use('*', function(req, res, next) {
    var alerts = req.flash();
    res.locals.alerts = alerts;
    next();
});

var db = require("./models/index.js");

app.get('/', function(req, res) {
    debug('>> Routing to /');
    var key = process.env.comic_vine_api_key;
    var searchURL = "http://www.comicvine.com/api/issues/?format=json&sort=id&api_key=" + key;
    res.render('index', {'searchURL': searchURL});
});

app.listen(3001);