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
export class DocumentTemplateService {

  constructor(private http: HttpClient) {
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  generateDocumentsHeaders(dataToSend: DataToSend): HttpHeaders {
    const headerMap: any = {}
    for (const key of Object.keys(dataToSend.placeholders)) {
      headerMap[key] = dataToSend.placeholders[key]
    }
    headerMap["id"] = dataToSend.id
    headerMap["Content-Type"] = "application/json"
    return new HttpHeaders(headerMap)
  }

  public async getAll(): Promise<DocumentTemplate[]> {
    return this.http.get<DocumentTemplate[]>("http://localhost:8008/api/v1/document-templates").toPromise()
  }

  public async get(id: string): Promise<DocumentTemplate> {
    return this.http.get<DocumentTemplate>("http://localhost:8008/api/v1/document-templates/" + id).toPromise()
  }

  public async create(documentTemplate: DocumentTemplate): Promise<DocumentTemplate> {
    return this.http.post<DocumentTemplate>("http://localhost:8008/api/v1/document-templates",
      documentTemplate,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }

  public async update(documentTemplate: DocumentTemplate): Promise<DocumentTemplate> {
    return this.http.put<DocumentTemplate>("http://localhost:8008/api/v1/document-templates",
      documentTemplate,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }

  public async generatePdf(dataToSend: DataToSend): Promise<GeneratedDocuments> {
    return this.http.get<GeneratedDocuments>("http://localhost:8008/api/v1/generate-documents",
      {
        headers: this.generateDocumentsHeaders(dataToSend),
        withCredentials: true
      }).toPromise()
  }
}

export class DocumentTemplate {
  public id: string
  public lastUpdatedUtc: Date
  public name: string
  public texTemplate: string
  public placeholders: string[]
}

export class DataToSend {
  public id: string
  public placeholders: any
}

export class GeneratedDocuments {
  public pdfFileName: string
  public texFileName: string
}
