import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTemplateThesisComponent } from './document-template-thesis.component';

describe('DocumentTemplateThesisComponent', () => {
  let component: DocumentTemplateThesisComponent;
  let fixture: ComponentFixture<DocumentTemplateThesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTemplateThesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTemplateThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
