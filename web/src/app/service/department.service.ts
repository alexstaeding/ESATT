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
import {Redirect} from "./Redirect"

@Injectable({
  providedIn: "root"
})
export class DepartmentService {

  host = window.location.origin
  endpointDepartments = this.host + "/api/v1/departments"

  constructor(private http: HttpClient) {
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  /**
   * Loads all departments from the database
   */
  public async getAll(): Promise<Department[]> {
    return Redirect.handle(this.http.get<Department[]>(this.endpointDepartments))
  }

  /**
   * Loads department with specified id from the database
   *
   * @param id id of the department
   */
  public async get(id: string): Promise<Department> {
    return Redirect.handle(this.http.get<Department>(this.endpointDepartments + "/" + id))
  }

  /**
   * Adds a new department to the database
   *
   * @param department department to be added
   */
  public async create(department: Department): Promise<Department> {
    return Redirect.handle(this.http.post<Department>(this.endpointDepartments,
      department,
      {
        headers: this.headers,
        withCredentials: true,
      }))
  }

  /**
   * Overwrites changed fields
   *
   * @param department department with the changed fields
   */
  public async update(department: Department): Promise<Department> {
    return Redirect.handle(this.http.put<Department>(this.endpointDepartments,
      department,
      {
        headers: this.headers,
        withCredentials: true
      }))
  }
}

export class Department {
  public id: number
  public lastUpdatedUtc: Date
  public name: string
}
