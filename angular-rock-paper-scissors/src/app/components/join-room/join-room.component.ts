import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {

  constructor(public socketService: SocketService) { }

  ngOnInit(): void {
  }

  public joinRoom(){
    // this.socketService.joinRoom();
  }

}
