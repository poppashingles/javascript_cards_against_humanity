const io = require("socket.io-client")

const app = function() {
  let selectedCard = false;
  const socket = io();

  socket.on('connect', function() {

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
  const blackCard = document.querySelector('#black-card')
  socket.on('show button', function(data) {
    startButton.style.display = "block";
  })

  startButton.addEventListener('click', function(evt) {
    socket.emit('new game');
    startButton.style.display = 'none';
    blackCard.style.display = 'block';

  });

  socket.on('cards given', function(cards) {
    const white_Cards = document.querySelector('#white-cards')
    white_Cards.innerHTML = ''
    cards.forEach(function(card) {
      const li = document.createElement('li')
      const anchor = document.createElement('a')
      anchor.innerText = card
      anchor.style.visibility = 'visible';
      li.appendChild(anchor)
      white_Cards.appendChild(li)
      li.addEventListener('click', function(evt){
        evt.preventDefault();
        if(!selectedCard) {
            socket.emit('white card', card)
            selectedCard = true;

        }

      })

    })

  })

  socket.on('czar confirm', function(message){
    const playerStatus = document.querySelector("#player-status")
    playerStatus.innerText = message;
  })

  socket.on('black card', function(blackCard) {
    const ul = document.querySelector('#black-card')
    ul.style.visibility = 'visible';
    ul.innerHTML = ''

    const li = document.createElement('li')
    const anchor = document.createElement('a')
    anchor.innerText = ''
    anchor.style.visibility = 'visible';
    anchor.innerText = blackCard
    li.appendChild(anchor)
    ul.appendChild(li)
  });



  socket.on('selected white cards', function(selectedCards){
    console.log(JSON.stringify(selectedCards));


    const ul = document.querySelector('#selected-white-cards');
    ul.style.visibility = 'visible';

    selectedCards.forEach(function(card) {
      let selectedWhiteCard = card.card;
      let player = card.selectingPlayer;
      const li = document.createElement('li');
      li.id = "selected-card"
      const anchor = document.createElement('a');
      anchor.style.visibility = 'visible';
      anchor.innerText = selectedWhiteCard;
      li.appendChild(anchor);
      ul.appendChild(li)

      li.addEventListener('click', function(evt) {
        evt.preventDefault()
        // console.log(evt);
        socket.emit('czar selects winning card', { card: selectedWhiteCard, player: player})
        selectedCard = false
        li.remove()

      })
    })

    socket.on('winner chosen', function(){
      const ul = document.querySelector('#selected-white-cards');
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    })

    // socket.on('announce winner', function(selectedCards) {
    //   // const p = document.querySelector('#declare-winner')
    //   // p.innerText = message
    //   selectedCards.innerHTML = ''
    // })

    // const li = document.querySelector('#selected-card')



  });




}

document.addEventListener("DOMContentLoaded", app)
