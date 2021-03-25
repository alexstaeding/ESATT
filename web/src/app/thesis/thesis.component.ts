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

import {Component, OnInit} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"
import {Thesis, ThesisService} from "../service/thesis.service"
import {MatTableDataSource} from "@angular/material/table"


@Component({
  selector: "app-thesis",
  templateUrl: "./thesis.component.html",
  styleUrls: ["./thesis.component.scss"]
})
export class ThesisComponent implements OnInit {

  displayedColumns: string[] = [
    "title",
    "firstName",
    "lastName",
    "studentId",
    "supervisorFirstName",
    "supervisorLastName",
    "thesisType",
    "departmentId",
    "status.signUpUtc",
    "status.dueDateUtc",
    "status.extendedDueDateUtc",
    "status.submittedUtc",
    "status.presentationUtc",
    "status.gradedUtc",
    "status.reportCreatedUtc",
  ]
  data: MatTableDataSource<Thesis>
  currentDate: Date = new Date()
  sorting = Sorting.NOT
  sortMode = Sorting
  currentField: string = null
  searchValue = ""

  constructor(
    public dialog: MatDialog,
    public thesisService: ThesisService,
  ) {
  }

  ngOnInit(): void {
    this.initData()
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
  public initData(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ) {
    this.searchValue = search
    this.thesisService.getAll(ascending, field, limit, preview, search).then(result => {
      if (result != null){
        this.data = new MatTableDataSource(result)
      }
    })
  }

  /**
   * Returns date as a string in correct, current or specified locale.
   *
   * @param date date that gets normalized
   */
  calcDate(date: Date): string {
    return (new Date(new Date(date.toString()))).toLocaleDateString()
  }

  /**
   * Returns a date in correct format.
   *
   * @param date date that gets normalized
   */
  normalizeDate(date: Date): Date {
    return new Date(date)
  }

  /**
   * Opens a detail page for specified thesis.
   *
   * @param id id of the thesis
   */
  openDialog(id: string = null) {
    this.dialog.open(ThesisDetailComponent, {
      width: "100%",
      data: {id, component: this},
    })
  }

  /**
   * Shortens title if it is too long.
   *
   * @param title title to be shortened
   */
  titlePreview(title): string {
    if (title != null) {
      let preview = title.substring(0, 25)
      if (preview !== title) {
        preview = preview + " ..."
      }
      return preview
    }
    return title
  }

  /**
   * Sorts table by specified field.
   *
   * @param field field to be sorted by
   */
  sort(field: string){
    if (this.currentField !== field){
      this.sorting = Sorting.NOT
    }
    this.currentField = field
    if (this.sorting === Sorting.NOT){
      this.sorting = Sorting.ASCENDING
      this.initData(true, field, null, true, this.searchValue)
    } else if (this.sorting === Sorting.ASCENDING){
      this.sorting = Sorting.DESCENDING
      this.initData(false, field, null, true, this.searchValue)
    } else if (this.sorting === Sorting.DESCENDING){
      this.sorting = Sorting.NOT
      this.initData(null, null, null, true, this.searchValue)
      this.currentField = null
    }
  }
}

/**
 * Enum for types of sort direction.
 */
export enum Sorting {
  NOT,
  DESCENDING,
  ASCENDING,
}
