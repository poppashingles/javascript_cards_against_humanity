const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nicknames = [];
const playerHand = [[10, 2]];
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

      // To integrate once game logic is in - make start button appear for players[0] player
      // const userObj = {
      //   name: socket.nickname,
      //   score: 0,
      //   isStartPerson: nicknames.length === 0,
      //   id: socket.id
      // };

      nicknames.push(socket.nickname);
      io.emit('usernames', nicknames);
      io.emit('chat message', socket.nickname + ' has joined the room');
    }
    if (nicknames.length === 1) {
      io.to(socket.id).emit('show button', data);
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

    //if isGame not running
    // emit to io.to(nicknames[0].id).emit('new game')

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
