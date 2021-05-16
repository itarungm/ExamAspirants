import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareNumberComponent } from './square-number.component';

describe('SquareNumberComponent', () => {
  let component: SquareNumberComponent;
  let fixture: ComponentFixture<SquareNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
