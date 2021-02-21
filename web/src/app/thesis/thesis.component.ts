import {Component, OnInit} from "@angular/core"
import {ThesisPreview, ThesisService} from "../service/thesis.service"
import {from, Observable} from "rxjs"

@Component({
  selector: "app-thesis",
  templateUrl: "./thesis.component.html",
  styleUrls: ["./thesis.component.scss"]
})
export class ThesisComponent implements OnInit {

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "studentId",
    "supervisorFirstName",
    "supervisorLastName",
    "thesisType",
    "departmentId",
    "departmentName",
    "subject",
    "title",
    "signUpUtc",
    "dueDateUtc",
    "extendedDueDateUtc",
    "submittedUtc",
    "presentationUtc",
    "gradedUtc",
    "reportCreatedUtc",
  ]
  data: Observable<ThesisPreview[]>
  currentDate: Date = new Date()

  constructor(public thesisService: ThesisService) {
  }

  ngOnInit(): void {
    this.data = from(this.thesisService.getAll())
  }
}
