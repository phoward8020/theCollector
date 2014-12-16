var express             = require('express')
  , request             = require('request')
  , expressControllers  = require('express-controller')
  , db                  = require('./models/index.js')
  , session             = require('express-session')
  , bcrypt              = require('bcrypt')
  , bodyParser          = require('body-parser')
  , flash               = require('connect-flash')
  , _                   = require('lodash')
  , debug               = require('debug');

app = express();
debug('>> Cranking up theCollector!');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

expressControllers
            .setDirectory( __dirname + '/controllers')
            .bind(app);

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

app.listen(3001);