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
  if (rq.session.pseudo){
    rs.render('home.ejs');
  }
  else{
    rq.session.pseudo = 'JohnDoe';
    rs.render('connexion.ejs')
  }
});

// sessionSockets.on('connection', function (err, socket, session) {
//
//   socket.on('newUser', function(pseudo){
//     session.pseudo = pseudo;
//     session.socketId = socket.id;
//     session.currentPage = "home";
//     session.save();
//     socket.emit('session', session);
//     var content = fs.readFileSync('db/usersON.json');
//     var data = JSON.parse(content);
//     var pseudoListUnsorted = [];
//     data.forEach(function(user){
//       pseudoListUnsorted.push(user.pseudo);
//     });
//     var pseudoList = pseudoListUnsorted.sort();
//     socket.emit('listUsersON', pseudoList);
//     var content = fs.readFileSync('db/usersON.json');
//     var data = JSON.parse(content);
//     var newI = data.length;
//     data[newI] = {pseudo:pseudo, socketId:session.socketId};
//     data = JSON.stringify(data, null, 2);
//     fs.writeFile('db/usersON.json', data , finished);
//     function finished(err){
//       console.log('added to usersON');
//     };
//     socket.broadcast.emit('userON', pseudo);
//   });
//   socket.on('disconnect', function() {
//     var content = fs.readFileSync('db/usersON.json');
//     var data = JSON.parse(content);
//     data.splice(data.indexOf(session.pseudo), 1);
//     data = JSON.stringify(data, null, 2);
//     fs.writeFile('db/usersON.json', data , finished);
//     function finished(err){
//       console.log('deleted from usersON');
//     };
//     socket.broadcast.emit('userOFF', session.pseudo);
//   });
//
// });

server.listen(8080);
