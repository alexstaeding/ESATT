import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSchemeGeneratorComponent } from './evaluation-scheme-generator.component';

describe('EvaluationSchemeGeneratorComponent', () => {
  let component: EvaluationSchemeGeneratorComponent;
  let fixture: ComponentFixture<EvaluationSchemeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationSchemeGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationSchemeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
