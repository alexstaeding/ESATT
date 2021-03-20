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
    const headerMap : any = {}
    for (const key of Object.keys(dataToSend.placeholders)) {

      headerMap[key] = dataToSend.placeholders[key]
    }
    headerMap["id"] = dataToSend.id
    headerMap["Content-Type"] = "application/json"

    return new HttpHeaders(headerMap)
  }

  public async getAll(): Promise<DocumentTemplate[]> {
    return this.http.get<DocumentTemplate[]>("http://localhost:8008/api/v1/document-template").toPromise()
  }

  public async get(id: string): Promise<DocumentTemplate> {
    return this.http.get<DocumentTemplate>("http://localhost:8008/api/v1/document-template/" + id).toPromise()
  }

  public async create(documentTemplate: DocumentTemplate): Promise<DocumentTemplate> {
    return this.http.post<DocumentTemplate>("http://localhost:8008/api/v1/document-template",
      documentTemplate,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }

  public async update(documentTemplate: DocumentTemplate): Promise<DocumentTemplate> {
    return this.http.put<DocumentTemplate>("http://localhost:8008/api/v1/document-template",
      documentTemplate,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }

  public async generatePdf(dataToSend: DataToSend): Promise<GeneratedDocuments>{
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
