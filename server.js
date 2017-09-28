
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var connections = [];
var users = [];

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`);

  // DISCONNECT
  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: ${connections.length} sockets connected`);

  });

  socket.on('send message', function(data) {
    io.sockets.emit('new message', { msg: data });
  });

});

server.listen(3000, () => {
  console.log('server online ...');
});
