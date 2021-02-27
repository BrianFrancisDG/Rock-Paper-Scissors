import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  newMessage: string;
  messageList: string[] = [];

  constructor(private socketService: SocketService){

  }

  ngOnInit(){
    this.socketService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
    this.socketService.getMovePlayed().subscribe((movePlayed: string) => {
      this.messageList.push(movePlayed);
    });
  }

  sendMessage() {
    this.socketService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

}
