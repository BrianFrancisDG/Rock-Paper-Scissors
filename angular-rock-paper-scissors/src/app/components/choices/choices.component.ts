import { Component, OnInit } from '@angular/core';
import { SelectedMoveService } from 'src/app/services/selected-move.service';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss']
})
export class ChoicesComponent implements OnInit {

  constructor(private selectedMoveService : SelectedMoveService) { }

  ngOnInit(): void {
  }
  
  toggleChecked($event) {
    this.selectedMoveService.setSelectedMove($event.target.id);
  }

}
