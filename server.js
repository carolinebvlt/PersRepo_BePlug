var express = require ('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io').listen(server);


app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/db'));
app.get('/', function(rq, rs){
  rs.render('messenger.ejs');
});


io.sockets.on('connection', function(socket, pseudo){

  socket.on('newUser', function(pseudo){
    socket.pseudo = pseudo;
    var content = fs.readFileSync('db/usersON.json');
    var data = JSON.parse(content);
    var newI = data.length;
    data[newI] = pseudo;
    data = JSON.stringify(data, null, 2);
    fs.writeFile('db/usersON.json', data , finished);
    function finished(err){
      console.log('done!');
    };
    socket.broadcast.emit('userON', pseudo);
  });

  socket.on('msg', function(msg){
    socket.broadcast.emit('msg', {exp:socket.pseudo, content:msg});
  });

});

server.listen(8080);
