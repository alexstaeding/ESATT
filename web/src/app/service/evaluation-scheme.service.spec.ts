import {TestBed} from "@angular/core/testing"

import {EvaluationSchemeService} from "./evaluation-scheme.service"

describe("EvaluationSchemeService", () => {
  let service: EvaluationSchemeService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(EvaluationSchemeService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
