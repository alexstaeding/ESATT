import {Component, Inject, OnInit} from "@angular/core"
import {MAT_DIALOG_DATA} from "@angular/material/dialog"
import {User, UserService} from "../../service/user.service"

@Component({
  selector: "app-user-new",
  templateUrl: "./user-new.component.html",
  styleUrls: ["./user-new.component.scss"]
})
export class UserNewComponent implements OnInit {
  user: User = new User()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService,
  ) {
  }

  async ngOnInit() {
    this.user = new User()
  }

  /**
   * Creates a new new user.
   */
  async create() {
    await this.userService.create(this.user)
    await this.data.component.initData()
  }
}
