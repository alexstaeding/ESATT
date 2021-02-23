import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInUserComponent } from './check-in-user.component';

describe('CheckInUserComponent', () => {
  let component: CheckInUserComponent;
  let fixture: ComponentFixture<CheckInUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
