var express     = require('express')
  , session     = require('express-session')
  , bcrypt      = require('bcrypt')
  , bodyParser  = require('body-parser')
  , flash       = require('connect-flash')
  , _           = require('lodash')
  , debug       = require('debug');

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: process.env.session_salt,
    resave: false,
    saveUninitialized: true
}));

var db = require("./models/index.js");

app.get('/', function(req, res) {
    var key = process.env.comic_vine_api_key;
    var searchURL = "http://www.comicvine.com/api/issues/?format=json&sort=id&api_key=" + key;
    res.render('index', {'searchURL': searchURL});
});

app.listen(3001);