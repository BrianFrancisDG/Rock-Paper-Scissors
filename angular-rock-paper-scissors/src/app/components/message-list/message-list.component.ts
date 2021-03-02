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
      if(message){
        this.messageList.push(message);
      } 
    });

    this.socketService.getMovePlayed().subscribe((movePlayed: string) => {
      if(movePlayed){
        this.messageList.push(movePlayed);
      }    
    });

    this.socketService.getConnectedUser().subscribe((connectedUser: string) => {
      if(connectedUser){
        this.messageList.push(connectedUser);
      }    
    });

    this.socketService.getDisconnectedUser().subscribe((disconnectedUser: string) => {
      if(disconnectedUser){
        this.messageList.push(disconnectedUser);
      }    
    });
  }

  sendMessage() {
    this.socketService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

}
