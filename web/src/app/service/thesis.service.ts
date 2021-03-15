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

  public async get(id: string): Promise<Thesis> {
    return this.http.get<Thesis>("http://localhost:8008/api/v1/theses/" + id).toPromise()
  }

  public async create(thesis: Thesis): Promise<Thesis> {
    return this.http.post<Thesis>("http://localhost:8008/api/v1/theses",
      thesis,
      {
        headers: this.headers,
        withCredentials: true,
      }).toPromise()
  }

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
