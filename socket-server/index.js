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

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    io.emit('disconnectedUser', `${user} disconnected!`);
  });

  // socket.on('joinRoom', (roomNumber) => {
  //   // if 'to' isnt specfied, will broadcast event to WHOLE server. 
  //   // TODO: Have people join a room intially then only broadcast to that room. Think like 'among us'

  //   socket.join(roomNumber);
  //   console.log(`${user} joined room ${roomNumber}.`);
  //   //socket.to(roomNumber).emit('message', `Hey! I ${user} joined room ${roomNumber}.`)

  // })
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
