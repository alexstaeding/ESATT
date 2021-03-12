import {Component, OnInit, ViewChild} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"
import {ThesisPreview, ThesisService} from "../service/thesis.service"
import {MatSort} from "@angular/material/sort"
import {MatTableDataSource} from "@angular/material/table"


@Component({
  selector: "app-thesis",
  templateUrl: "./thesis.component.html",
  styleUrls: ["./thesis.component.scss"]
})
export class ThesisComponent implements OnInit {

  displayedColumns: string[] = [
    "title",
    "firstName",
    "lastName",
    "studentId",
    "supervisorFirstName",
    "supervisorLastName",
    "thesisType",
    "departmentName",
    "signUpUtc",
    "dueDateUtc",
    "extendedDueDateUtc",
    "submittedUtc",
    "presentationUtc",
    "gradedUtc",
    "reportCreatedUtc",
  ]
  data: MatTableDataSource<ThesisPreview>
  currentDate: Date = new Date()

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public thesisService: ThesisService,
  ) {
  }

  ngOnInit(): void {
    this.initData()
  }

  public initData() {
    this.thesisService.getAll().then(result => {
      this.data = new MatTableDataSource(result)
      this.data.sort = this.sort
    })
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
      data: {id, component: this},
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  titlePreview(title): string {
    if (title != null) {
      let preview = title.substring(0, 25)
      if (preview != title) {
        preview = preview + " ..."
      }
      return preview
    }
    return title
  }
}
