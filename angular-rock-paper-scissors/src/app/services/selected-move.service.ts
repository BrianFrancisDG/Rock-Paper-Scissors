import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedMoveService {

  public selectedMove$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() { }
 
  getSelectedMove(){
    return this.selectedMove$.asObservable();

  }

  setSelectedMove(move: string) {
    this.selectedMove$.next(move);
  }
}
