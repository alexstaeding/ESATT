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
    "studentID",
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
    "presentationUtc",
    "submittedUtc",
    "gradedUtc",
  ]
  data: Observable<ThesisPreview[]>

  getRecord(row) {
    console.log(row.thesisTopic + " row clicked")
  }

  constructor(public thesisService: ThesisService) {
  }

  ngOnInit(): void {
    this.data = from(this.thesisService.getAll())
  }
}
