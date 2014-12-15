var express     = require('express')
  , bodyParser  = require('body-parser')
  , request     = require('request')
  , _           = require("lodash");

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var db = require("./models/index.js");

res.send(comic_vine_api_key
var searchURL = "http://www.comicvine.com/api/issues/?api_key=9e64e5c3d8e7c61dae9d11ceafffe126ed354592&format=json&sort=id"



app.listen(3001);