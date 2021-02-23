import {Component, OnInit} from "@angular/core"
import {User, UserService} from "../service/user.service"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

  user: User = new User()
  editableUser: User
  userWithChanges: User
  originalUser: User

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.get("601037d1be6ad412f1e29d12").then(result => {
      this.user = result
    })
    this.editableUser = {...this.user}
  }

  editorEnabled: Boolean = false

  enableEditor(): void {
    this.originalUser = {...this.user}
    this.editorEnabled = true
  }

  save(): void {
    this.userWithChanges = new User
    this.userWithChanges.id = this.user.id
    for (let key in this.user) {
      if (this.originalUser[key] != this.user[key]) {
        this.userWithChanges[key] = this.user[key]
      }
    }
    this.userService.update(this.userWithChanges)
    this.editorEnabled = false
  }

  disableEditor(): void {
    this.user = {...this.originalUser}
    this.editorEnabled = false
  }

  getFromUser(prop: string): any {
    if (this.user == null) {
      return "Loading..."
    } else {
      return this.user[prop]
    }
  }
}
