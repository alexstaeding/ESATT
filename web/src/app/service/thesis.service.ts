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
export class ThesisService extends BaseRepositoryService<Thesis> {
  constructor(http: HttpClient, router: Router) {
    super(http, router, `${window.location.origin}/api/v1/theses`)
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
