import {Component, OnInit} from "@angular/core"
import {from, Observable} from "rxjs"
import {MatDialog} from "@angular/material/dialog"
import {ThesisPreview, ThesisService} from "../service/thesis.service"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"


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

  constructor(
    public dialog: MatDialog,
    public thesisService: ThesisService,
  ) {
  }

  ngOnInit(): void {
    this.data = from(this.thesisService.getAll())
  }

  calcDate(lastUpdated: Date): string {
    return (new Date(new Date(lastUpdated.toString()))).toLocaleDateString()
  }

  normalizeDate(date: Date): Date {
    return new Date(date)
  }

  openDialog(id: string = null) {
    this.dialog.open(ThesisDetailComponent, {
      width: "100%",
      data: {
        id: id,
      }
    })
  }
}
