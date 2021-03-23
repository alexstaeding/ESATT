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
export class EvaluationSchemeService {

  host = window.location.origin
  endpointEvaluationSchemes = this.host + "/api/v1/evaluation-schemes"

  constructor(private http: HttpClient) {
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  /**
   * Loads evaluation schemes from database.
   *
   * @param ascending true for ascending sorting
   * @param field field to be used for sorting
   * @param limit limit how many evaluation schemes will be loaded
   * @param preview true if only fields that are in the overview table are needed
   * @param search value to search for in table
   */
  public async getAll(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ): Promise<EvaluationScheme[]> {
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
    return this.http.get<EvaluationScheme[]>(this.endpointEvaluationSchemes,
      {
        headers: headerMap
      }).toPromise()
  }

  /**
   * Loads evaluation scheme with specified id from the database
   *
   * @param id id of the evaluation scheme
   */
  public async get(id: string): Promise<EvaluationScheme> {
    return this.http.get<EvaluationScheme>(this.endpointEvaluationSchemes + "/" + id).toPromise()
  }

  /**
   * Adds a new evaluation scheme to the database
   *
   * @param evaluationScheme evaluation scheme to be added
   */
  public async create(evaluationScheme: EvaluationScheme): Promise<EvaluationScheme> {
    return this.http.post<EvaluationScheme>(this.endpointEvaluationSchemes,
      evaluationScheme,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }

  /**
   * Overwrites changed fields
   *
   * @param evaluationScheme evaluation scheme with the changed fields
   */
  public async update(evaluationScheme: EvaluationScheme): Promise<EvaluationScheme> {
    return this.http.put<EvaluationScheme>(this.endpointEvaluationSchemes,
      evaluationScheme,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }
}

export class EvaluationScheme {
  public id: string
  public lastUpdatedUtc: Date
  public name: string
  public description: string
  public criteria: Criterion[]
}

export class Criterion {
  public name: string
  public description: string
  public weight: number
  public counter: string
  public criteria: Criterion[]
}
