import {Component, OnInit} from "@angular/core"
import {MatTableDataSource} from "@angular/material/table"
import {User, UserService} from "../service/user.service"


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

  columnScheme = ["ttitle", "tprof", "tcreated", "tassigned", "tstatus"]
  dataScheme = new MatTableDataSource(DATA)
  emptyUser: User = new User()
  user: User = this.emptyUser
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


  loading = false
  count = DATA.length

  editable = {
    userName: "maja123",
    email: "maja@mail.com",
    firstName: "Maja",
    lastName: "Musterfrau"

  }
  editableNew = {...this.editable}

  enableEditor(): void {
    this.originalUser = {...this.user}
    this.editorEnabled = true
  }

  save(): void {
    this.userWithChanges = new User
    this.userWithChanges.id = this.user.id
    for (let key in this.user){
      if (this.originalUser[key] != this.user[key]){
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

  getFromUser(prop: string):any{
    if(this.user == this.emptyUser){
      return "Loading..."
    }else{
      return this.user[prop]
    }
  }


}

export interface Thesis {
  ttitle: string
  tprof: string
  tcreated: Date
  tassigned: string
  tstatus: string
}

const DATA: Thesis[] = [
  {ttitle: "Insekten", tprof: "Biene Maja", tcreated: new Date(2021, 1, 25), tassigned: "Willi", tstatus: "abgegeben"},
  {ttitle: "Insekten", tprof: "Biene Maja", tcreated: new Date(2021, 1, 25), tassigned: "Willi", tstatus: "abgegeben"},
  {ttitle: "Insekten", tprof: "Biene Maja", tcreated: new Date(2021, 1, 25), tassigned: "Willi", tstatus: "abgegeben"},
  {ttitle: "Insekten", tprof: "Biene Maja", tcreated: new Date(2021, 1, 25), tassigned: "Willi", tstatus: "abgegeben"},
  {ttitle: "Insekten", tprof: "Biene Maja", tcreated: new Date(2021, 1, 25), tassigned: "Willi", tstatus: "abgegeben"},
  {ttitle: "Insekten", tprof: "Biene Maja", tcreated: new Date(2021, 1, 25), tassigned: "Willi", tstatus: "abgegeben"}
]
