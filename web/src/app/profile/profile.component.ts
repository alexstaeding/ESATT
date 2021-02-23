import {Component, OnInit} from "@angular/core"
import {User, UserService} from "../service/user.service"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

  user: User = new User()
  userWithChanges: User
  originalUser: User
  editorEnabled: Boolean = false
  allUsers: User[] = []

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAll().then(result => {
      this.allUsers = result
      if(this.allUsers.length === 0){
        this.user = new User()
      }else{
        this.user = this.getLatestUser()
      }
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
}
