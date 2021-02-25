import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGameSpaceComponent } from './main-game-space.component';

describe('MainGameSpaceComponent', () => {
  let component: MainGameSpaceComponent;
  let fixture: ComponentFixture<MainGameSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGameSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGameSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
