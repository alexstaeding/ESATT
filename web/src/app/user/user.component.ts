import {Component, OnInit} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {MatTableDataSource} from "@angular/material/table"
import {Router} from "@angular/router"
import {User, UserService} from "../service/user.service"
import {UserDetailComponent} from "./user-detail/user-detail.component"

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "userName",
    "email",
  ]
  data: MatTableDataSource<User>
  sorting = Sorting.NOT
  sortMode = Sorting
  currentField: string = null
  searchValue: string = ""
  currentUser: User

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getUser().then(result => {
      this.currentUser = {...result}
    })
    this.initData()
  }

  /**
   * Loads users from database.
   *
   * @param ascending true for ascending sorting
   * @param field field to be used for sorting
   * @param limit limit how many users will be loaded
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
    this.userService.getAll(ascending, field, limit, preview, search).then(result => {
      this.data = new MatTableDataSource(result)
    })
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

  /**
   * Opens a detail page for specified user or dashboard if the id belongs to the current user.
   *
   * @param id id of the user
   */
  openDialog(id: string = null) {
    if (id === this.currentUser.id) {
      this.router.navigate(["dashboard"])
    } else {
      this.dialog.open(UserDetailComponent, {
        data: {id, component: this},
      })
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
