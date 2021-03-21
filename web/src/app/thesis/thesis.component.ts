import {Component, OnInit} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"
import {Thesis, ThesisService} from "../service/thesis.service"
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
    "departmentId",
    "status.signUpUtc",
    "status.dueDateUtc",
    "status.extendedDueDateUtc",
    "status.submittedUtc",
    "status.presentationUtc",
    "status.gradedUtc",
    "status.reportCreatedUtc",
  ]
  data: MatTableDataSource<Thesis>
  currentDate: Date = new Date()
  sorting = Sorting.NOT
  sortMode = Sorting
  currentField: string = null
  searchValue: string = ""

  constructor(
    public dialog: MatDialog,
    public thesisService: ThesisService,
  ) {
  }

  ngOnInit(): void {
    this.initData()
  }

  public initData(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ) {
    this.searchValue = search
    this.thesisService.getAll(ascending, field, limit, preview, search).then(result => {
      this.data = new MatTableDataSource(result)
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

  sort(field: string) {
    if (this.currentField !== field) {
      this.sorting = Sorting.NOT
    }
    this.currentField = field
    if (this.sorting === Sorting.NOT) {
      this.sorting = Sorting.ASCENDING
      this.initData(true, field, null, true, this.searchValue)
    } else if (this.sorting === Sorting.ASCENDING) {
      this.sorting = Sorting.DESCENDING
      this.initData(false, field, null, true, this.searchValue)
    } else if (this.sorting === Sorting.DESCENDING) {
      this.sorting = Sorting.NOT
      this.initData(null, null, null, true, this.searchValue)
      this.currentField = null
    }
  }
}

export enum Sorting {
  NOT,
  DESCENDING,
  ASCENDING,
}
