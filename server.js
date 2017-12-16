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
app.use(express.static(__dirname + '/favicons'));

app.get('/', function(rq, rs){
  rq.session.pseudo = rq.session.pseudo || 'JohnDoe';
  rs.render('messenger.ejs');
});

sessionSockets.on('connection', function (err, socket, session) {

  socket.emit('session', session);

  socket.on('newUser', function(pseudo){
    session.pseudo = pseudo;
    session.save();
    socket.emit('session', session);
    var content = fs.readFileSync('db/usersON.json');
    var data = JSON.parse(content);
    var sorted = data.sort();
    socket.emit('listUsersON', sorted);
    /*--------------A DESACTIVER QUAND ON UTILISE NODEMON-------------*/
    // var content = fs.readFileSync('db/usersON.json');
    // var data = JSON.parse(content);
    // var newI = data.length;
    // data[newI] = pseudo;
    // data = JSON.stringify(data, null, 2);
    // fs.writeFile('db/usersON.json', data , finished);
    // function finished(err){
    //   console.log('added to usersON');
    // };
    /*----------------------------------------------------------------*/
    socket.broadcast.emit('userON', pseudo);
  });

  socket.on('msg', function(msg){
    socket.broadcast.emit('msg', {exp:session.pseudo, content:msg});
  });

  socket.on('disconnect', function() {
    /*--------------A DESACTIVER QUAND ON UTILISE NODEMON-------------*/
    // var content = fs.readFileSync('db/usersON.json');
    // var data = JSON.parse(content);
    // data.splice(data.indexOf(session.pseudo), 1);
    // data = JSON.stringify(data, null, 2);
    // fs.writeFile('db/usersON.json', data , finished);
    // function finished(err){
    //   console.log('deleted from usersON');
    // };
    /*----------------------------------------------------------------*/
    socket.broadcast.emit('userOFF', session.pseudo);
  });
});

server.listen(8080);
