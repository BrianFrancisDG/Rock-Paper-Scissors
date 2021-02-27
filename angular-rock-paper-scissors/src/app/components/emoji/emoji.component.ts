import { Component, OnInit } from '@angular/core';
import { SelectedMoveService } from 'src/app/services/selected-move.service';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {

  currentMove = '';

  constructor(private selectedMoveService : SelectedMoveService) { }

  ngOnInit(): void {
    this.selectedMoveService.getSelectedMove().subscribe(data => {     
      this.currentMove = data;
    });
  }
}
