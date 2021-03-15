import {Component, OnInit} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {MatTableDataSource} from "@angular/material/table"
import {ThesisDetailComponent} from "../thesis/thesis-detail/thesis-detail.component"
import {ThesisPreview, ThesisService} from "../service/thesis.service"
import {User, UserService} from "../service/user.service"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  user: User = new User()
  userWithChanges: User
  originalUser: User
  editorEnabled: Boolean = false
  allUsers: User[] = []
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
  data: MatTableDataSource<ThesisPreview>
  currentDate: Date = new Date()
  sorting = Sorting.NOT
  sortMode = Sorting
  currentField: string = null
  searchValue: string = ""

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    public thesisService: ThesisService,
  ) {
  }

  ngOnInit() {
    this.initData()
  }

  public async initData(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ) {
    await this.userService.getAll().then(result => {
      this.allUsers = result
      if (this.allUsers.length === 0) {
        this.user = new User()
      } else {
        this.user = this.getLatestUser()
      }
    })
    const myTheses = []
    this.searchValue = search
    await this.thesisService.getAll(ascending, field, limit, preview, search).then(result => {
      for (const thesis of result) {
        if (thesis.supervisorId === this.user.id && thesis.status.reportCreatedUtc == null) {
          myTheses.push(thesis)
        }
      }
    })
    this.data = new MatTableDataSource(myTheses)
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

  getLatestUser(): User {
    if (this.allUsers.length === 0) {
      return null
    }
    let latestUser = this.allUsers[0]
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.getCheckInDate(latestUser.id) < this.getCheckInDate(this.allUsers[i].id)) {
        latestUser = this.allUsers[i]
      }
    }
    return latestUser
  }

  getCheckInDate(id: string): Date {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000)
  }

  enableEditor() {
    this.originalUser = {...this.user}
    this.editorEnabled = true
  }

  save() {
    this.userWithChanges = new User()
    this.userWithChanges.id = this.user.id
    for (let key in this.user) {
      if (this.originalUser[key] != this.user[key]) {
        this.userWithChanges[key] = this.user[key]
      }
    }
    this.userService.update(this.userWithChanges)
    this.editorEnabled = false
  }

  disableEditor() {
    this.user = {...this.originalUser}
    this.editorEnabled = false
  }

  getFromUser(prop: string): string {
    if (this.user == null) {
      return "Loading..."
    } else {
      return this.user[prop]
    }
  }

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

  sort(field : string){
    if (this.currentField !== field){
      this.sorting = Sorting.NOT
    }
    this.currentField = field
    if (this.sorting === Sorting.NOT){
      this.sorting = Sorting.ASCENDING
      this.initData(true, field, null, false, this.searchValue)
    } else if (this.sorting === Sorting.ASCENDING){
      this.sorting = Sorting.DESCENDING
      this.initData(false, field, null, false, this.searchValue)
    } else if (this.sorting === Sorting.DESCENDING){
      this.sorting = Sorting.NOT
      this.initData(null, null, null, false, this.searchValue)
      this.currentField = null
    }
  }
}

export enum Sorting {
  NOT,
  DESCENDING,
  ASCENDING,
}
