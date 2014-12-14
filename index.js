var express     = require('express')
  , bodyParser  = require('body-parser');

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var db = require("./models/index.js");


app.get('/', function(req, res) {
    res.render('index');
});

app.listen(3001);