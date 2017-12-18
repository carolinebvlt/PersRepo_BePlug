var socket = io.connect('http://localhost:8080');
var pseudo = prompt('What\'s your name ?');
var session;
var room = "testRoom";
socket.emit('newUser', pseudo);

socket.on('connect', function(){
  socket.emit('room', room);
});
socket.on('session', function(data){
  session = data;
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
socket.on('msgTest', function(msg){
  console.log('RoomMessage : '+msg);
});

/*-------------ONCLICK---------------*/

function getSection(section){
  document.getElementById(session.currentPage).style.display = "none";
  if (section == "home"){
    document.getElementById("home").style.display = "block";
    socket.emit('updateCurrentPage', "home");
  }
  else if (section == "usersON") {
    document.getElementById('usersON').style.height = "60vh";
    document.getElementById('usersON').style.overflow = "hidden";// dont work
    socket.emit('updateCurrentPage', "usersON");
  }
  else{
    document.getElementById(section).style.display = "block";
    var rq = new XMLHttpRequest();
    rq.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById(section).innerHTML = this.responseText;
      }
    };
    rq.open("GET", "/sections/"+section + ".ejs", true);
    rq.send();
    socket.emit('updateCurrentPage', section);
  }
}
function sendMsg(event){
  event.preventDefault();
  var msg = document.getElementById('message').value;
  insertOwnMsg('chatZone',pseudo, msg);
  console.log(msg);
  socket.emit('msg', msg);
  document.getElementById('message').value = "";
}

function talkTo(pseudo){

}

/*--------------------------  FUNCTIONS  ---------------------------------*/

function insertMsg(targetId, msg){
  var parent = document.getElementById(targetId);
  var p = document.createElement('p');
  p.innerHTML = "<strong>"+msg.exp+" : </strong>" + msg.content;
  p.style.margin = "10px";
  parent.append(p);
}
function insertOwnMsg(targetId, pseudo, msg){
  var parent = document.getElementById(targetId);
  var p = document.createElement('p');
  p.innerHTML = "<strong><i>Me</i> : </strong>" + msg;
  p.style.margin = "10px";
  parent.append(p);
}
function ONlog(pseudo){
  var parent = document.getElementById('chatZone');
  var p = document.createElement('p');
  p.innerHTML = "<i>"+pseudo+" is online </i>";
  p.style.margin = "10px";
  parent.append(p);
}
function OFFlog(pseudo){
  var parent = document.getElementById('chatZone');
  var p = document.createElement('p');
  p.innerHTML = "<i>"+pseudo+" has quit </i>";
  p.style.margin = "10px";
  parent.append(p);
}
function insertListUsersON(list){
  list.forEach(function(pseudo){
    var parent = document.getElementById('usersON');
    var li = document.createElement('li');
    li.innerHTML = pseudo;
    li.onclick = 'talkTo('+ pseudo+')';
    parent.append(li);
  });
}
