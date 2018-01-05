const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({extended: true}));





const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('App running!!');
});
