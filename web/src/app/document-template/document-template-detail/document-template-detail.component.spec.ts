import {ComponentFixture, TestBed} from "@angular/core/testing"

import {DocumentTemplateDetailComponent} from "./document-template-detail.component"

describe("DocumentTemplateDetailComponent", () => {
  let component: DocumentTemplateDetailComponent
  let fixture: ComponentFixture<DocumentTemplateDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentTemplateDetailComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTemplateDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
