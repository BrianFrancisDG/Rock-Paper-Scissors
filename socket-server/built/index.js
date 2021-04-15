"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});
var connectedPlayers = {};
var roomCounter = {};
/**
 * { 1111:
 *  {
 *    playersInRoom:[p1,p2],
 *    playersCount: 2
 *  }
 * }
 */
var port = process.env.PORT || 3000;
io.on('connection', function (socket) {
    var fullSocketId = socket.id;
    var user = fullSocketId.substr(0, 2);
    console.log('a user connected');
    //TODO: Add hasPlayerMovedFlag boolean
    var connectedPlayer = {
        socketId: fullSocketId,
        currentRoom: fullSocketId
    };
    connectedPlayers[fullSocketId] = connectedPlayer;
    console.log(connectedPlayers);
    io.emit('connectedUser', user + " connected!", fullSocketId);
    socket.on('message', function (message) {
        console.log(message);
        io.emit('message', user + " said " + message);
    });
    socket.on('movePlayed', function (movePlayed) {
        var currentPlayerRoom = connectedPlayers[fullSocketId].currentRoom;
        // TODO: Add a property to check if they've already played a move
        // do game logic.
        // send a "waitingOnMove" event to UI to disable buttons
        console.log(fullSocketId + " in room " + currentPlayerRoom + " played " + movePlayed);
        io.to(currentPlayerRoom).emit('movePlayed', user + " played " + movePlayed);
    });
    socket.on('disconnect', function () {
        console.log('a user disconnected!');
        io.emit('disconnectedUser', user + " disconnected!");
    });
    socket.on('joinRoom', function (roomNumber) {
        // TODO: Add disable moves until player is in a room event to the UI.
        // TODO: Add current room check
        if (!(roomNumber in roomCounter)) {
            var newRoom = {
                playersInRoom: [],
                playersCount: 0
            };
            roomCounter[roomNumber] = newRoom;
        }
        if (roomCounter[roomNumber].playersCount < 2) {
            socket.join(roomNumber);
            console.log(user + " joined room " + roomNumber + ".");
            connectedPlayers[fullSocketId].currentRoom = roomNumber;
            socket.to(roomNumber).emit('message', "Hey! I " + user + " joined room " + roomNumber + ".");
            roomCounter[roomNumber].playersCount += 1;
            console.log("roomCounter: " + roomNumber + ":" + roomCounter[roomNumber].playersCount);
        }
        else {
            // TODO: Debug why this message isnt sending to user. But room checking works
            socket.to(fullSocketId).emit('message', "Sorry, Room " + roomNumber + " is full.");
            console.log("room full");
        }
    });
    // Doing room clean up before leaving room.
    socket.on('disconnecting', function () {
        // subtract player
        var connectedPlayerRoom = connectedPlayers[fullSocketId].currentRoom;
        roomCounter[connectedPlayerRoom].playersCount -= 1;
        console.log("roomCounter: " + connectedPlayerRoom + ":" + roomCounter[connectedPlayerRoom].playersCount);
    });
});
httpServer.listen(port, function () { return console.log("listening on port " + port); });
