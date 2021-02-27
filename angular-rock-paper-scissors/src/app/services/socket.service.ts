import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject(null);
  public movePlayed$: BehaviorSubject<string> = new BehaviorSubject(null);
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
}
