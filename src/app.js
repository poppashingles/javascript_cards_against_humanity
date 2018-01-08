const io = require("socket.io-client")

const app = function() {
  const socket = io();

  socket.on('connect', function() {
    console.log('connected');

    const buttonForm = document.querySelector('#click-form');

    buttonForm.addEventListener('click', function(evt) {
      evt.preventDefault();

      const nickBox = document.querySelector('#nickname');
      socket.emit('new user', nickBox.value, function(data) {
        if(data) {

          document.querySelector('#nickname-div').style.display='none';
          document.querySelector('#chat').style.display='block';
          document.querySelector('#side-nav-l').style.display='block';
          document.querySelector('#side-nav-r').style.display='block';


        } else {
          document.querySelector('#nick-error').innerHTML = "That username is already taken, try again";
        }
      });
      nickBox.value = '';
    });
  });

  socket.on('usernames', function(data) {
    var html = '<br/><p>Users currently signed in</p><br/>';
    for(i=0 ; i<data.length ; i++) {
      html += data[i] + '<br/>'
    }
    document.querySelector('#users').innerHTML = html;
  });


  const chatButton = document.querySelector('#chat-button')
  chatButton.addEventListener('click', function(evt){
    evt.preventDefault();
    let message = document.querySelector('#m');
    socket.emit('chat message', message.value);
    message.value = '';
    return false;
  });

  socket.on('chat message', function(msg){
    const li = document.createElement('li');
    li.innerText = msg;
    document.querySelector('#messages').appendChild(li)
  });

  const startButton = document.querySelector('#new-game-button')
  socket.on('show button', function(data) {
    startButton.style.display = "block";
  })

  startButton.addEventListener('click', function(evt) {
    //   // Reference the method to start a new game here
    startButton.style.display = 'none';
  });
  
}

document.addEventListener("DOMContentLoaded", app)
