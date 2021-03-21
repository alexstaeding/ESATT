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
import {Department, DepartmentService} from "../../service/department.service"
import {Grade, Grading, Note, Thesis} from "../../service/thesis.service"
import {MatTableDataSource} from "@angular/material/table"
import {MatTreeNestedDataSource} from "@angular/material/tree"
import {NestedTreeControl} from "@angular/cdk/tree"
import {User, UserService} from "../../service/user.service"

@Component({
  selector: "app-document-template-thesis",
  templateUrl: "./document-template-thesis.component.html",
  styleUrls: ["./document-template-thesis.component.scss"]
})
export class DocumentTemplateThesisComponent implements OnInit {

  thesis: Thesis = new Thesis()
  selectedTab = 0
  genderType = Gender
  datasource: MatTableDataSource<Note>
  displayedColumns: string[] = ["Datum", "Notiz"]
  grading: Grading = new Grading()
  treeControl = new NestedTreeControl<Grade>(node => node.grades)
  dataSource = new MatTreeNestedDataSource<Grade>()
  users: User[]
  departments: Department[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService,
    private departmentService: DepartmentService,
  ) {
  }

  hasChild = (_: number, node: Grade) => !!node.grades && node.grades.length > 0

  ngOnInit() {
    this.userService.getAll().then(result => {
      this.users = result
    })
    this.departmentService.getAll().then(result => {
      this.departments = result
    })
    this.thesis = this.data.thesis
    const data: Note[] = this.thesis.notes
    this.datasource = new MatTableDataSource<Note>(data)
    if (this.thesis.grading != null) {
      this.setAllCounters(this.thesis.grading.grades)
      this.grading = this.thesis.grading
      this.dataSource.data = this.grading.grades
    }
  }

  setAllCounters(grades: Grade[], parent: Grade = null, preCounter: string = "") {
    if (grades == null || grades.length === 0) {
      return
    }
    grades.forEach((grade, index) => {
      grade.counter = preCounter + (index + 1).toString() + "."
      this.setAllCounters(grade.grades, grade, grade.counter)
    })
  }
}

// values used by translate module
export enum Gender {
  FEMALE = "gender.female",
  MALE = "gender.male",
  OTHER = "gender.other",
}
