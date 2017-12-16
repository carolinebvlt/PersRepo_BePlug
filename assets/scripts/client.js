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
});

socket.on('userON', function(pseudo){
  ONlog(pseudo);
});
socket.on('userOFF', function(pseudo){
  OFFlog(pseudo);
});
socket.on('listUsersON', function(list){
  insertListUsersON(list);
});
// socket.on('session', function(session){
//   console.log('logSessionPseudo = '+ session.pseudo);
// }) OK

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
function OFFlog(pseudo){
  var parent = document.getElementById('chatZone');
  var p = document.createElement('p');
  p.innerHTML = "<i>"+pseudo+" has quit </i>";
  parent.append(p);
}
function insertListUsersON(list){
  list.forEach(function(user){
    var parent = document.getElementById('usersON');
    var li = document.createElement('li');
    li.innerHTML = user;
    parent.append(li);
  });
}
