import {TestBed} from "@angular/core/testing"

import {DocumentTemplateService} from "./document-template.service"

describe("DocumentTemplateService", () => {
  let service: DocumentTemplateService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DocumentTemplateService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
