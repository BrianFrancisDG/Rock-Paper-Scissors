import { Player } from "./models/player";

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

let connectedPlayers = {};
let roomCounter = {};
/**
 * { 1111: 
 *  { 
 *    playersInRoom:[p1,p2], 
 *    playersCount: 2
 *  }
 * }
 */

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

  let fullSocketId = socket.id;
  let user = fullSocketId.substr(0, 2);
  console.log('a user connected');

  //TODO: Add hasPlayerMovedFlag boolean
  const connectedPlayer: Player = {
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
    let currentPlayerRoom = connectedPlayers[fullSocketId].currentRoom;

    // TODO: Add a property to check if they've already played a move
    // do game logic.
    // send a "waitingOnMove" event to UI to disable buttons

    console.log(`${fullSocketId} in room ${currentPlayerRoom} played ${movePlayed}`);
    io.to(currentPlayerRoom).emit('movePlayed', `${user} played ${movePlayed}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    io.emit('disconnectedUser', `${user} disconnected!`);
  });

  socket.on('joinRoom', (roomNumber) => {

    // TODO: Add disable moves until player is in a room event to the UI.
    // TODO: Add current room check

    if(!(roomNumber in roomCounter)){
      roomCounter[roomNumber] = 0;
    }

    if(roomCounter[roomNumber] < 2){
      socket.join(roomNumber);
      console.log(`${user} joined room ${roomNumber}.`);
      connectedPlayers[fullSocketId].currentRoom = roomNumber;

      socket.to(roomNumber).emit('message', `Hey! I ${user} joined room ${roomNumber}.`);

      roomCounter[roomNumber] += 1;

      console.log(`roomCounter: ${roomNumber}:${roomCounter[roomNumber]}`);

    }else{
      // TODO: Debug why this message isnt sending to user. But room checking works
      socket.to(fullSocketId).emit('message', `Sorry, Room ${roomNumber} is full.`);
      console.log("room full");
    }
  });

  // Doing room clean up before leaving room.
  socket.on('disconnecting', () => {
    // subtract player
    let connectedPlayerRoom = connectedPlayers[fullSocketId].currentRoom;
    roomCounter[connectedPlayerRoom] -= 1;

    console.log(`roomCounter: ${connectedPlayerRoom}:${roomCounter[connectedPlayerRoom]}`);
  });

});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
