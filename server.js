const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nicknames = [];

app.use(bodyParser.json());
app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('new user', function(data, callback) {
    if (nicknames.indexOf(data) != -1) {
      callback(false);
    } else {
      callback(true);
      socket.nickname = data;
      nicknames.push(socket.nickname);
      io.emit('usernames', nicknames);
      io.emit('chat message', socket.nickname + ' has joined the room');
    }
    if (nicknames.length === 1) {
      io.emit('show button', data);
    }
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    if(socket.nickname) {
      io.emit('chat message', socket.nickname + ' has left the room');
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      io.emit('usernames', nicknames);
    }
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', socket.nickname + ': ' + msg);
  });
});

const port = process.env.PORT || 3000;

http.listen(port, function() {
  console.log('App running!!');
});
