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

import {HttpClient, HttpResponse} from "@angular/common/http"
import {Observable} from "rxjs"
import {Router} from "@angular/router";

export abstract class BaseRepositoryService<T> {

  protected constructor(
    protected http: HttpClient,
    protected router: Router,
    protected endpointRepository: string,
  ) {
  }

  public handle<E>(observable: Observable<HttpResponse<E>>): Promise<E> {
    console.log("foo")
    return observable.toPromise().then(result => {
      console.log("100")
      console.log(result)
      return result
    }, result => {
      if (result.status === 401) {
        this.router.navigateByUrl(result.error)
      }
      return null
    })
  }

  /**
   * Loads items from backend.
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
  ): Promise<T[]> {
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
    return this.handle(this.http.get<T[]>(
      this.endpointRepository,
      {
        observe: "response",
        headers: headerMap
      }))
  }

  /**
   * Loads user with specified id from the database
   *
   * @param id id of the user
   */
  public async get(id: string): Promise<T> {
    return this.handle(this.http.get<T>(this.endpointRepository + "/" + id, {observe: "response"}))
  }

  /**
   * Adds a new document to the database
   *
   * @param document item to be added
   */
  public async create(document: T): Promise<T> {
    return this.handle(this.http.post<T>(
      this.endpointRepository,
      document,
      {
        observe: "response",
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }))
  }

  /**
   * Overwrites changed fields
   *
   * @param document user with the changed fields
   */
  public async update(document: T): Promise<T> {
    return this.handle(this.http.put<T>(
      this.endpointRepository,
      document,
      {
        observe: "response",
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }))
  }
}
