var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('client/build'))
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log('App running!');
});
