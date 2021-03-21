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
export class ThesisService {

  constructor(private http: HttpClient) {
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  /**
   * Loads theses from database.
   *
   * @param ascending true for ascending sorting
   * @param field field to be used for sorting
   * @param limit limit how many theses will be loaded
   * @param preview true if only fields that are in the overview table are needed
   * @param search value to search for in table
   */
  public async getAll(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ): Promise<Thesis[]> {
    const headerMap = {}
    if (ascending != null) {
      headerMap["ascending"] = ascending.toString()
    }
    if (field != null) {
       headerMap["field"] = field
    }
    if (limit != null) {
        headerMap["limit"] =  limit.toString()
    }
    if (preview != null) {
      headerMap["preview"] =  preview.toString()
    }
    if (search != null && search != "") {
        headerMap["search"] =  search
    }
    return this.http.get<Thesis[]>("http://localhost:8008/api/v1/theses",
    {
      headers: headerMap
    }).toPromise()
  }

  /**
   * Loads thesis with specified id from the database
   *
   * @param id id of the thesis
   */
  public async get(id: string): Promise<Thesis> {
    return this.http.get<Thesis>("http://localhost:8008/api/v1/theses/" + id).toPromise()
  }

  /**
   * Adds a new thesis to the database
   *
   * @param thesis thesis to be added
   */
  public async create(thesis: Thesis): Promise<Thesis> {
    return this.http.post<Thesis>("http://localhost:8008/api/v1/theses",
      thesis,
      {
        headers: this.headers,
        withCredentials: true,
      }).toPromise()
  }

  /**
   * Overwrites changed fields
   *
   * @param thesis thesis with the changed fields
   */
  public async update(thesis: Thesis): Promise<Thesis> {
    return this.http.put<Thesis>("http://localhost:8008/api/v1/theses",
      thesis,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }
}

export class Thesis {
  public id: string
  public lastUpdatedUtc: Date
  public firstName: string
  public lastName: string
  public gender: string
  public email: string
  public studentId: string
  public supervisorId: string
  public supervisorFirstName: string
  public supervisorLastName: string
  public coSupervisorId: string
  public coSupervisorFirstName: string
  public coSupervisorLastName: string
  public evaluatorFirstName: string
  public evaluatorLastName: string
  public thesisType: string
  public departmentId: number
  public departmentName: string
  public subject: string
  public title: string
  public status: Status
  public notes: Note[]
  public grade: number
  public calculatedGrade: number
  public grading: Grading
}

export class Status {
  public allocationDateUtc: Date
  public signUpUtc: Date
  public presentationUtc: Date
  public dueDateUtc: Date
  public extendedDueDateUtc: Date
  public submittedUtc: Date
  public gradedUtc: Date
  public reportCreatedUtc: Date
}

export class Note {
  creatorId: string
  createdUtc: Date
  content: string
}

export class Grading {
  public name: string
  public description: string
  public grades: Grade[]
}

export class Grade {
  public name: string
  public description: string
  public weight: number
  public counter: string
  public grades: Grade[]
  public grade: number
}
