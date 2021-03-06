import { Player } from "./models/player";
import { PlayerTracker } from "./models/player-tracker";
import { Room } from "./models/room";
import { RoomCounter } from "./models/room-counter";

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

let connectedPlayers: PlayerTracker = {};
let roomCounter: RoomCounter = {};
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
    currentRoom: fullSocketId,
    movePlayed: 'none'
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
    //if(roomCounter[currentPlayerRoom].playersInRoom[0])

    console.log(`${fullSocketId} in room ${currentPlayerRoom} played ${movePlayed}`);
    io.to(currentPlayerRoom).emit('movePlayed', `${user} played ${movePlayed}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    io.emit('disconnectedUser', `${user} disconnected!`);
  });

  socket.on('joinRoom', (roomNumber) => {

    // TODO: Add disable moves until player is in a room event to the UI.
    io.emit('Joined Room', {fullSocketId, roomNumber});
    // handle in FE
    // TODO: Add current room check

    if(!(roomNumber in roomCounter)){
      let newRoom: Room = {
        playersInRoom: [],
        playersCount: 0
      };

      roomCounter[roomNumber] = newRoom;
    }

    if(roomCounter[roomNumber].playersCount < 2){
      socket.join(roomNumber);
      console.log(`${user} joined room ${roomNumber}.`);
      connectedPlayers[fullSocketId].currentRoom = roomNumber;

      socket.to(roomNumber).emit('message', `Hey! I ${user} joined room ${roomNumber}.`);

      roomCounter[roomNumber].playersCount += 1;
      // adding to players in room
      roomCounter[roomNumber].playersInRoom.push(fullSocketId);

      console.log(`playersInRoom: ${roomNumber}:${roomCounter[roomNumber].playersInRoom}`);

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
    console.log(connectedPlayer);
    if(connectedPlayerRoom in roomCounter){
      roomCounter[connectedPlayerRoom].playersCount -= 1;

      // removing player in room
      roomCounter[connectedPlayerRoom].playersInRoom = roomCounter[connectedPlayerRoom].playersInRoom.filter(id => id !== fullSocketId);
      console.log(`playersInRoom: ${connectedPlayerRoom}:${roomCounter[connectedPlayerRoom].playersInRoom}`);
    }

  });

});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
