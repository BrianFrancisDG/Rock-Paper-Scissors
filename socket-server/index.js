const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

let connectedPlayers = {};

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

  let fullSocketId = socket.id;
  let user = fullSocketId.substr(0, 2);
  console.log('a user connected');

  const connectedPlayer = {
    socketId: fullSocketId,
    currentRoom: fullSocketId
  }

  connectedPlayers[fullSocketId] = connectedPlayer;

  console.log(connectedPlayers);

  io.emit('connectedUser', `${user} connected!`, fullSocketId);

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${user} said ${message}`);
  });

  socket.on('movePlayed', (movePlayed) => {
    currentPlayerRoom = connectedPlayers[fullSocketId].currentRoom;
    console.log(`${fullSocketId} in room ${currentPlayerRoom} played ${movePlayed}`);
    io.to(currentPlayerRoom).emit('movePlayed', `${user} played ${movePlayed}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    io.emit('disconnectedUser', `${user} disconnected!`);
    //pass disconnected socketId
  });

  socket.on('joinRoom', (roomNumber) => {

    socket.join(roomNumber);
    console.log(`${user} joined room ${roomNumber}.`);
    connectedPlayers[fullSocketId].currentRoom = roomNumber;

    socket.to(roomNumber).emit('message', `Hey! I ${user} joined room ${roomNumber}.`)

  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
