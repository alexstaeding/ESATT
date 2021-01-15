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

  public async getAll(): Promise<ThesisPreview[]> {
    return this.http.get<ThesisPreview[]>("http://localhost:8008/api/v1/theses").toPromise()
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

export class ThesisPreview {
  public id: string
  public lastUpdatedUtc: Date
  public firstName: string
  public lastName: string
  public studentId: string
  public supervisorFirstName: string
  public supervisorLastName: string
  public thesisType: string
  public departmentId: number
  public departmentName: string
  public subject: string
  public title: string
  public status: Status
}

export class Status {
  public allocationDateUtc: Date
  public signUpUtc: Date
  public presentationUtc: Date
  public presented: boolean
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
