var express = require ('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var io = require('socket.io').listen(server);
var myCookieParser = cookieParser('secret');
var sessionStore = new expressSession.MemoryStore();
var SessionSockets = require('session.socket.io');
var sessionSockets = new SessionSockets(io, sessionStore, myCookieParser);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(myCookieParser);
app.use(expressSession({ secret: 'secret', store: sessionStore, resave:true, saveUninitialized: true }));

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/db'));

app.get('/', function(rq, rs){
  rq.session.pseudo = rq.session.pseudo || 'JohnDoe';
  rs.render('home.ejs');
});

sessionSockets.on('connection', function (err, socket, session) {

  socket.on('newUser', function(pseudo){
    session.pseudo = pseudo;
    session.socketId = socket.id;
    session.currentPage = "home";
    session.save();
    socket.emit('session', session);
    var content = fs.readFileSync('db/usersON.json');
    var data = JSON.parse(content);
    var pseudoListUnsorted = [];
    data.forEach(function(user){
      pseudoListUnsorted.push(user.pseudo);
    });
    var pseudoList = pseudoListUnsorted.sort();
    socket.emit('listUsersON', pseudoList);
    var content = fs.readFileSync('db/usersON.json');
    var data = JSON.parse(content);
    var newI = data.length;
    data[newI] = {pseudo:pseudo, socketId:session.socketId};
    data = JSON.stringify(data, null, 2);
    fs.writeFile('db/usersON.json', data , finished);
    function finished(err){
      console.log('added to usersON');
    };
    socket.broadcast.emit('userON', pseudo);
  });
  socket.on('disconnect', function() {
    var content = fs.readFileSync('db/usersON.json');
    var data = JSON.parse(content);
    data.splice(data.indexOf(session.pseudo), 1);
    data = JSON.stringify(data, null, 2);
    fs.writeFile('db/usersON.json', data , finished);
    function finished(err){
      console.log('deleted from usersON');
    };
    socket.broadcast.emit('userOFF', session.pseudo);
  });
  socket.on('updateCurrentPage', function(currentPage){
    session.currentPage = currentPage;
    session.save();
    socket.emit('session', session);
  });
  socket.on('msg', function(msg){
    socket.broadcast.emit('msg', {exp:session.pseudo, content:msg});
  });
  socket.on('room', function(room){
    socket.join(room);
    socket.broadcast.to(room).emit('msgTest', 'someone joint de room');
    //on ne voit pas le message lié a sa propre connection mais celle des autres oui
  });
});

server.listen(8080);
