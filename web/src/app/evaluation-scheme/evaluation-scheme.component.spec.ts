import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSchemeComponent } from './evaluation-scheme.component';

describe('EvaluationSchemeComponent', () => {
  let component: EvaluationSchemeComponent;
  let fixture: ComponentFixture<EvaluationSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
