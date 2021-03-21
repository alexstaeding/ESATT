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

import {Injectable} from "@angular/core"
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    })
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
  public async getAll(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ): Promise<User[]> {
    const headerMap = {}
    if (ascending != null) {
      headerMap["ascending"] = ascending.toString()
    }
    if (field != null) {
      headerMap["field"] = field
    }
    if (limit != null) {
      headerMap["limit"] = limit.toString()
    }
    if (preview != null) {
      headerMap["preview"] = preview.toString()
    }
    if (search != null && search != "") {
      headerMap["search"] = search
    }
    return this.http.get<User[]>("http://localhost:8008/api/v1/users",
      {
        headers: headerMap
      }).toPromise()
  }

  /**
   * Loads user with specified id from the database
   *
   * @param id id of the user
   */
  public async get(id: string): Promise<User> {
    return this.http.get<User>("http://localhost:8008/api/v1/users/" + id).toPromise()
  }

  /**
   * Loads the currently signed in user
   */
  public async getUser(): Promise<User> {
    return this.http.get<User>("http://localhost:8008/api/v1/currentUser").toPromise()
  }

  /**
   * Adds a new user to the database
   *
   * @param user user to be added
   */
  public async create(user: User): Promise<User> {
    return this.http.post<User>("http://localhost:8008/api/v1/users",
      user,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }

  /**
   * Overwrites changed fields
   *
   * @param user user with the changed fields
   */
  public async update(user: User): Promise<User> {
    return this.http.put<User>("http://localhost:8008/api/v1/users",
      user,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
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
