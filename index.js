var express     = require('express')
  , body-parser = require('body-parser');

app = express();

app.set('view-engine', 'ejs');

app.get('/', function(response, request) {
    res.render('index');
});

app.listen(3001);