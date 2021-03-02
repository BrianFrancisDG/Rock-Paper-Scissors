const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  let user = socket.id.substr(0, 2);
  console.log('a user connected');

  io.emit('connectedUser', `${user} connected!`);

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${user} said ${message}`);
  });

  socket.on('movePlayed', (movePlayed) => {
    console.log(movePlayed);
    io.emit('movePlayed', `${user} played ${movePlayed}`);
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected!');
    io.emit('disconnectedUser', `${user} disconnected!`);
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
