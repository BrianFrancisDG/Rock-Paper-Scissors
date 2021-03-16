import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { Player } from '../models/player.model';


@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject(null);
  public movePlayed$: BehaviorSubject<string> = new BehaviorSubject(null);
  public connectedUser$: BehaviorSubject<string> = new BehaviorSubject(null);
  public disconnectedUser$: BehaviorSubject<string> = new BehaviorSubject(null);

  public connectedPlayers = {}

  constructor() {}

  socket = io('http://localhost:3000');

  public sendMessage(message) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  
  public sendMovePlayed(movePlayed) {
    this.socket.emit('movePlayed', movePlayed);
  }

  public getMovePlayed = () => {
    this.socket.on('movePlayed', (movePlayed) =>{
      this.movePlayed$.next(movePlayed);
    });

    return this.movePlayed$.asObservable();
  };

  
  public getConnectedUser = () => {
    this.socket.on('connectedUser', (connectedUser, socketId) =>{
      this.connectedUser$.next(connectedUser);

      const connectedPlayer: Player = {
        socketId: socketId,
        currentRoom: socketId
      }

      this.connectedPlayers[socketId] = connectedPlayer;

      console.log(this.connectedPlayers);

    });

    return this.connectedUser$.asObservable();
  };

  public getDisconnectedUser = () => {
    this.socket.on('disconnectedUser', (disconnectedUser) =>{
      this.disconnectedUser$.next(disconnectedUser);
      
    });

    return this.disconnectedUser$.asObservable();
  };

  public joinRoom() {
    this.socket.emit('joinRoom', '1111');
  }
}
