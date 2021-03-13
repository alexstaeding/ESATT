import {Component, OnInit, ViewChild} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"
import {ThesisPreview, ThesisService} from "../service/thesis.service"
import {MatSort} from "@angular/material/sort"
import {MatTableDataSource} from "@angular/material/table"
import {filter} from "rxjs/operators"


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
  sorting = Sorting.NOT
  sortMode = Sorting
  currentField: string = null

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
    search: string = null,
  ) {
    this.thesisService.getAll(ascending, field, limit, search).then(result => {
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

  sort(field : string){
    if (this.sorting === Sorting.NOT){
      this.sorting = Sorting.DESCENDING
    } else if (this.sorting === Sorting.DESCENDING){
      this.sorting = Sorting.ASCENDING
    } else if (this.sorting === Sorting.ASCENDING){
      this.sorting = Sorting.NOT
    }
  }
}

export enum Sorting {
  NOT,
  DESCENDING,
  ASCENDING,
}
