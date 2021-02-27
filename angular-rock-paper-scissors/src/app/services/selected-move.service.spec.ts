import { TestBed } from '@angular/core/testing';

import { SelectedMoveService } from './selected-move.service';

describe('SelectedMoveService', () => {
  let service: SelectedMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
