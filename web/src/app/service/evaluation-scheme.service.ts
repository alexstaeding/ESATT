import {Injectable} from "@angular/core"
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: "root"
})
export class EvaluationSchemeService {

  constructor(private http: HttpClient) {
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

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
      headerMap["limit"] =  limit.toString()
    }
    if (preview != null) {
      headerMap["preview"] =  preview.toString()
    }
    if (search != null && search != "") {
      headerMap["search"] =  search
    }
    return this.http.get<EvaluationScheme[]>("http://localhost:8008/api/v1/evaluation-schemes",
      {
        headers: headerMap
      }).toPromise()
  }

  public async get(id: string): Promise<EvaluationScheme> {
    return this.http.get<EvaluationScheme>("http://localhost:8008/api/v1/evaluation-schemes/" + id).toPromise()
  }

  public async create(evaluationScheme: EvaluationScheme): Promise<EvaluationScheme> {
    return this.http.post<EvaluationScheme>("http://localhost:8008/api/v1/evaluation-schemes",
      evaluationScheme,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }

  public async update(evaluationScheme: EvaluationScheme): Promise<EvaluationScheme> {
    return this.http.put<EvaluationScheme>("http://localhost:8008/api/v1/evaluation-schemes",
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
