import {Component, Inject, OnInit} from "@angular/core"
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog"
import {MatTableDataSource} from "@angular/material/table"
import {Thesis, ThesisService} from "../../service/thesis.service"
import {ThesisDetailComponent} from "../../thesis/thesis-detail/thesis-detail.component"
import {User, UserService} from "../../service/user.service"

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  user: User = new User()
  userWithChanges: User
  originalUser: User
  editorEnabled: Boolean = false
  displayedColumns: string[] = [
    "title",
    "firstName",
    "lastName",
    "studentId",
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
  dataSource: MatTableDataSource<Thesis>
  currentDate: Date = new Date()
  sorting = Sorting.NOT
  sortMode = Sorting
  currentField: string = null
  searchValue: string = ""

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private userService: UserService,
    public thesisService: ThesisService,
  ) {
  }

  ngOnInit() {
    this.initData()
  }

  /**
   * Loads chosen user and theses this user is currently supervising from database.
   *
   * @param ascending true for ascending sorting
   * @param field field to be used for sorting
   * @param limit limit how many theses will be loaded
   * @param preview true if only fields that are in the overview table are needed
   * @param search value to search for in table
   */
  public async initData(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ) {
    await this.userService.get(this.data.id).then(result => {
      this.user = result
    })
    const usersTheses = []
    this.searchValue = search
    await this.thesisService.getAll(ascending, field, limit, preview, search).then(result => {
      for (const thesis of result) {
        if (thesis.supervisorId === this.user.id && thesis.status.reportCreatedUtc == null) {
          usersTheses.push(thesis)
        }
      }
    })
    this.dataSource = new MatTableDataSource(usersTheses)
  }

  /**
   * Returns date as a string in correct, current or specified locale.
   *
   * @param date date that gets normalized
   */
  calcDate(date: Date): string {
    return (new Date(new Date(date.toString()))).toLocaleDateString()
  }

  /**
   * Returns a date in correct format.
   *
   * @param date date that gets normalized
   */
  normalizeDate(date: Date): Date {
    return new Date(date)
  }

  /**
   * Opens a detail page for specified thesis.
   *
   * @param id id of the thesis
   */
  openDialog(id: string = null) {
    this.dialog.open(ThesisDetailComponent, {
      width: "100%",
      data: {id, component: this},
    })
  }

  /**
   * Enables edit mode.
   */
  enableEditor() {
    this.originalUser = {...this.user}
    this.editorEnabled = true
  }

  /**
   * Saves changes in user fields.
   */
  async save() {
    this.userWithChanges = new User()
    this.userWithChanges.id = this.user.id
    for (let key in this.user) {
      if (this.originalUser[key] != this.user[key]) {
        this.userWithChanges[key] = this.user[key]
      }
    }
    await this.userService.update(this.userWithChanges)
    await this.data.component.initData()
    this.editorEnabled = false
  }

  /**
   * Disables edit mode.
   */
  disableEditor() {
    this.user = {...this.originalUser}
    this.editorEnabled = false
  }

  /**
   * Shortens title if it is too long.
   *
   * @param title title to be shortened
   */
  titlePreview(title): string {
    if (title != null) {
      let preview = title.substring(0, 30)
      if (preview != title) {
        preview = preview + " ..."
      }
      return preview
    }
    return title
  }

  /**
   * Sorts table by specified field.
   *
   * @param field field to be sorted by
   */
  sort(field: string) {
    if (this.currentField !== field) {
      this.sorting = Sorting.NOT
    }
    this.currentField = field
    if (this.sorting === Sorting.NOT) {
      this.sorting = Sorting.ASCENDING
      this.initData(true, field, null, false, this.searchValue)
    } else if (this.sorting === Sorting.ASCENDING) {
      this.sorting = Sorting.DESCENDING
      this.initData(false, field, null, false, this.searchValue)
    } else if (this.sorting === Sorting.DESCENDING) {
      this.sorting = Sorting.NOT
      this.initData(null, null, null, false, this.searchValue)
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
