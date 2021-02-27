import { Component, OnInit } from '@angular/core';
import { SelectedMoveService } from 'src/app/services/selected-move.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent implements OnInit {

  currentMove = '';

  constructor(
    private selectedMoveService : SelectedMoveService,
    private socketService: SocketService
    ) { }

  ngOnInit(): void {
    this.selectedMoveService.getSelectedMove().subscribe(data => {     
      this.currentMove = data;
    });
  }

  playMove(){
    this.socketService.sendMovePlayed(this.currentMove);
    console.log("move played!");
  }

}
