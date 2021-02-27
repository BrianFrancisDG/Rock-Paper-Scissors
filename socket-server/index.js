const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });

  socket.on('movePlayed', (movePlayed) => {
    console.log(movePlayed);
    io.emit('movePlayed', `${socket.id.substr(0, 2)} played ${movePlayed}`);
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
