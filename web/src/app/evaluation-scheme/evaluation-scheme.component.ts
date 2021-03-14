import {Component, OnInit} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {EvaluationSchemeDetailComponent} from "./evaluation-scheme-detail/evaluation-scheme-detail.component"
import {EvaluationSchemePreview, EvaluationSchemeService} from "../service/evaluation-scheme.service"
import {MatTableDataSource} from "@angular/material/table"

@Component({
  selector: "app-evaluation-scheme",
  templateUrl: "./evaluation-scheme.component.html",
  styleUrls: ["./evaluation-scheme.component.scss"]
})
export class EvaluationSchemeComponent implements OnInit {
  columnsScheme = ["name", "description", "createdOnUtc", "lastUpdatedUtc"]
  data: MatTableDataSource<EvaluationSchemePreview>
  sorting = Sorting.NOT
  sortMode = Sorting
  currentField: string = null
  searchValue: string = ""

  constructor(
    private evaluationSchemeService: EvaluationSchemeService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.initData()
  }

  public initData(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    search: string = null,
  ) {
    this.searchValue = search
    this.evaluationSchemeService.getAll(ascending, field, limit, search).then(result => {
      this.data = new MatTableDataSource(result)
    })
  }

  openDetail(id: string = null) {
    this.dialog.open(EvaluationSchemeDetailComponent, {
      width: "100%",
      data: {id, component: this}
    })
  }

  showDate(evalSchemeId): string {
    const date = new Date(parseInt(evalSchemeId.substring(0, 8), 16) * 1000)
    return date.toLocaleString()
  }

  calcDate(lastUpdated: Date): string {
    return (new Date(new Date(lastUpdated.toString()).getTime())).toLocaleString()
  }

  descriptionPreview(description): string {
    if (description != null) {
      let preview = description.substring(0, 50)
      if (preview != description) {
        preview = preview + " ..."
      }
      return preview
    }
    return description
  }

  sort(field : string){
    if (this.currentField !== field){
      this.sorting = Sorting.NOT
    }
    this.currentField = field
    if (this.sorting === Sorting.NOT){
      this.sorting = Sorting.ASCENDING
      if(field === "createdOnUtc") {
        this.initData(true, null, null, this.searchValue)
        return
      }
      this.initData(true, field, null, this.searchValue)
    } else if (this.sorting === Sorting.ASCENDING){
      this.sorting = Sorting.DESCENDING
      if(field === "createdOnUtc") {
        this.initData(false, null, null, this.searchValue)
        return
      }
      this.initData(false, field, null, this.searchValue)
    } else if (this.sorting === Sorting.DESCENDING){
      this.sorting = Sorting.NOT
      this.initData(null, null, null, this.searchValue)
      this.currentField = null
    }
  }
}

export enum Sorting {
  NOT,
  DESCENDING,
  ASCENDING,
}
