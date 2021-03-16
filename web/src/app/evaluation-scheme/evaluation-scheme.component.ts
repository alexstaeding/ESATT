import {Component, OnInit} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {EvaluationSchemeDetailComponent} from "./evaluation-scheme-detail/evaluation-scheme-detail.component"
import {EvaluationScheme, EvaluationSchemeService} from "../service/evaluation-scheme.service"
import {MatTableDataSource} from "@angular/material/table"

@Component({
  selector: "app-evaluation-scheme",
  templateUrl: "./evaluation-scheme.component.html",
  styleUrls: ["./evaluation-scheme.component.scss"]
})
export class EvaluationSchemeComponent implements OnInit {
  columnsScheme = ["name", "description", "createdUtc", "lastUpdatedUtc"]
  data: MatTableDataSource<EvaluationScheme>
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

  /**
   * Loads evaluation schemes from database.
   *
   * @param ascending true for ascending sorting
   * @param field field to be used for sorting
   * @param limit limit how many theses will be loaded
   * @param preview true if only fields that are in the overview table are needed
   * @param search value to search for in table
   */
  public initData(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ) {
    this.searchValue = search
    this.evaluationSchemeService.getAll(ascending, field, limit, preview, search).then(result => {
      this.data = new MatTableDataSource(result)
    })
  }

  /**
   * Opens a detail page for specified evaluation scheme.
   *
   * @param id id of the evaluation scheme
   */
  openDetail(id: string = null) {
    this.dialog.open(EvaluationSchemeDetailComponent, {
      width: "100%",
      data: {id, component: this}
    })
  }

  /**
   * calculates the creation date from the id.
   *
   * @param evalSchemeId id of the evaluation scheme
   */
  showDate(evalSchemeId): string {
    const date = new Date(parseInt(evalSchemeId.substring(0, 8), 16) * 1000)
    return date.toLocaleString()
  }

  /**
   * Returns date as a string in correct, current or specified locale.
   *
   * @param date date that gets normalized
   */
  calcDate(date: Date): string {
    return (new Date(new Date(date.toString()).getTime())).toLocaleString()
  }

  /**
   * Shortens description if it is too long.
   *
   * @param description description to be shortened
   */
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

  /**
   * Sorts table by specified field.
   *
   * @param field field to be sorted by
   */
  sort(field : string){
    if (this.currentField !== field){
      this.sorting = Sorting.NOT
    }
    this.currentField = field
    if (this.sorting === Sorting.NOT){
      this.sorting = Sorting.ASCENDING
      if(field === "createdUtc") {
        this.initData(true, null, null, true, this.searchValue)
        return
      }
      this.initData(true, field, null, true, this.searchValue)
    } else if (this.sorting === Sorting.ASCENDING){
      this.sorting = Sorting.DESCENDING
      if(field === "createdUtc") {
        this.initData(false, null, null, true, this.searchValue)
        return
      }
      this.initData(false, field, null, true, this.searchValue)
    } else if (this.sorting === Sorting.DESCENDING){
      this.sorting = Sorting.NOT
      this.initData(null, null, null, true, this.searchValue)
      this.currentField = null
    }
  }
}

/**
 * Enum for types of sort direction.
 */
export enum Sorting {
  NOT,
  DESCENDING,
  ASCENDING,
}
