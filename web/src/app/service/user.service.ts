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

import {BaseRepositoryService} from "./BaseRepositoryService"
import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {Router} from "@angular/router"

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseRepositoryService<User> {

  host = window.location.origin
  endpointCurrentUser = this.host + "/api/v1/current-user"
  endpointSignIn = this.host + "/api/v1/sign-in"
  endpointSignOut = this.host + "/api/v1/sign-out"

  constructor(http: HttpClient, router: Router) {
    super(http, router, `${window.location.origin}/api/v1/users`)
  }

  /**
   * Loads the currently signed in user
   */
  public async getCurrentUser(): Promise<User> {
    return this.handle(this.http.get<User>(this.endpointCurrentUser, {observe: "response"}))
  }

  public async signIn(userName, password): Promise<LoginStatus> {
    return this.http.post(this.endpointSignIn, {},
      {
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`)
        },
        responseType: "text",
        withCredentials: true,
      }).toPromise().then(
      result => LoginStatus[result.replace(new RegExp("\"", "g"), "")],
      result => {
        const status = LoginStatus[result.toString().replace(new RegExp("\"", "g"), "")]
        if (status != null) {
          return status
        }
        return LoginStatus.OTHER
      },
    )
  }

  public async signOut(): Promise<void> {
    return this.http.post(this.endpointSignOut, {}, {responseType: "text"}).toPromise().then(result => {
      this.router.navigateByUrl("/sign-in")
    })
  }
}

export class User {
  public id: string
  public lastUpdatedUtc: Date
  public userName: string
  public email: string
  public firstName: string
  public lastName: string
  public isLinkedLDAP: boolean
}

export enum LoginStatus {
  SUCCESS,
  MISSING,
  INVALID,
  OTHER,
}
