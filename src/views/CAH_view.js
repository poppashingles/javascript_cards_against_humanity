



// <script>
//   $(function () {
//     var socket = io();
//     var $nickForm = $('#set-nickname');
//     var $nickError = $('#nick-error');
//     var $nickBox = $('#nickname');
//     var $users = $('#users');
//
//     $nickForm.submit(function(e) {
//       e.preventDefault();
//       socket.emit('new user', $nickBox.val(), function(data) {
//         if(data) {
//           $('#nickname-div').toggle();
//           $('#chat').toggle();
//           $('#side-nav-l').toggle();
//           $('#side-nav-r').toggle();
//         } else {
//           $nickError.html('That username is already taken, try again');
//         }
//       });
//       $nickBox.val('');
//     });
//
//     socket.on('usernames', function(data) {
//       var html = '<br/><p>Users currently signed in</p><br/>';
//       for(i=0 ; i<data.length ; i++) {
//         html += data[i] + '<br/>'
//       }
//       $users.html(html)
//     });
//
//     socket.on('show button', function(data) {
//       $('#new-game-button').show();
//     })
//
//     $('#new-game-button').click(function() {
//       // Reference the method to start a new game here
//       $('#new-game-button').hide();
//     })
//
//     $('#chat-send').submit(function(){
//       socket.emit('chat message', $('#m').val());
//       $('#m').val('');
//       return false;
//     });
//
//     socket.on('chat message', function(msg){
//       $('#messages').append($('<li>').text(msg));
//     });
//   });
// </script>
