import {Component, Inject, OnInit} from "@angular/core"
import {MAT_DIALOG_DATA} from "@angular/material/dialog"
import {User, UserService} from "../../service/user.service"

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {

  mode = Mode
  currentMode: Mode = Mode.NORMAL

  user: User = new User()
  originalUser: User
  userWithChanges: User

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService,
  ) {
  }

  async ngOnInit() {
    if (this.data.id == null) {
      this.user = new User()
      this.currentMode = Mode.NEW
    } else {
      await this.userService.get(this.data.id).then(result => {
        this.originalUser = {...result}
        this.resetUser()
      })
    }
  }

  /**
   * Changes mode to edit
   */
  changeToEdit() {
    this.originalUser = {...this.user}
    this.currentMode = Mode.EDIT
  }

  /**
   * Creates a new new user.
   */
  async create() {
    this.originalUser = {...this.user}
    await this.userService.create(this.user)
    this.currentMode = Mode.NORMAL
    await this.data.component.initData()
  }

  /**
   * Saves changes in user fields
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
    this.currentMode = Mode.NORMAL
    await this.data.component.initData()
  }

  /**
   * Resets user to original user
   */
  resetUser() {
    this.user = {...this.originalUser}
    this.currentMode = Mode.NORMAL
  }
}

export enum Mode {
  EDIT,
  NEW,
  NORMAL,
}
