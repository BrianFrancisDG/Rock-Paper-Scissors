import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  //constructor(private socket: Socket) {}
  constructor() {}

  socket = io('http://localhost:3000');


  public sendMessage(message) {
    this.socket.emit('message', message);
  }

  public getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  };
}
