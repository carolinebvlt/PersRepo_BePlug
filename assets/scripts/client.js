var socket = io.connect('http://localhost:8080');
var pseudo = prompt('What\'s your name ?');

socket.emit('newUser', pseudo);

document.getElementById('submitMsg').addEventListener('click', function(event){
  event.preventDefault();
  msg = document.getElementById('message').value;
  socket.emit('msg', msg);
  insertOwnMsg('chatZone',pseudo, msg);
  document.getElementById('message').value = '';
});

socket.on('msg', function(msg){
  insertMsg('chatZone', msg);
})

socket.on('userON', function(pseudo){
  ONlog(pseudo);
})

/*--------------------------  FUNCTIONS  ---------------------------------*/

function insertMsg(targetId, msg){
  var parent = document.getElementById(targetId);
  var p = document.createElement('p');
  p.innerHTML = "<strong>"+msg.exp+" : </strong>" + msg.content;
  parent.append(p);
}
function insertOwnMsg(targetId, pseudo, msg){
  var parent = document.getElementById(targetId);
  var p = document.createElement('p');
  p.innerHTML = "<strong><i>Me</i> : </strong>" + msg;
  parent.append(p);
}
function ONlog(pseudo){
  var parent = document.getElementById('chatZone');
  var p = document.createElement('p');
  p.innerHTML = "<i>"+pseudo+" is online </i>";
  parent.append(p);
}
