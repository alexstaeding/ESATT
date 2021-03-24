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
import {BaseRepositoryService} from "./BaseRepositoryService";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DocumentTemplateService extends BaseRepositoryService<DocumentTemplate> {

  host = window.location.origin
  endpointGenerateDocuments = this.host + "/api/v1/generate-documents"

  constructor(http: HttpClient, router: Router) {
    super(http, router, `${window.location.origin}/api/v1/document-templates`)
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

  public async generatePdf(dataToSend: DataToSend): Promise<GeneratedDocuments> {
    return this.handle(this.http.get<GeneratedDocuments>(this.endpointGenerateDocuments,
      {
        observe: "response",
        headers: this.generateDocumentsHeaders(dataToSend),
        withCredentials: true
      }))
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
