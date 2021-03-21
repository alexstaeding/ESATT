/*
 *   ESATT - https://www.github.com/alexstaeding/ESATT
 *   Copyright (C) 2021 Bachelor-Praktikum Gruppe 20
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Lesser General Public License for more details.
 *
 *     You should have received a copy of the GNU Lesser General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
