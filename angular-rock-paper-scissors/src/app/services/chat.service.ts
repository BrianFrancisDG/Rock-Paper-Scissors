import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  public sendMessage(message) {
    this.socket.emit('message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  };
}
