import {ComponentFixture, TestBed} from "@angular/core/testing"

import {EvaluationSchemeDetailComponent} from "./evaluation-scheme-detail.component"

describe("EvaluationSchemeDetailComponent", () => {
  let component: EvaluationSchemeDetailComponent
  let fixture: ComponentFixture<EvaluationSchemeDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationSchemeDetailComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationSchemeDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
