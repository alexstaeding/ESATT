import {Injectable} from "@angular/core"
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: "root"
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  public async getAll(): Promise<Department[]> {
    return this.http.get<Department[]>("http://localhost:8008/api/v1/departments").toPromise()
  }

  public async get(id: string): Promise<Department> {
    return this.http.get<Department>("http://localhost:8008/api/v1/departments/" + id).toPromise()
  }

  public async create(department: Department): Promise<Department> {
    return this.http.post<Department>("http://localhost:8008/api/v1/departments",
      department,
      {
        headers: this.headers,
        withCredentials: true,
      }).toPromise()
  }

  public async update(department: Department): Promise<Department> {
    return this.http.put<Department>("http://localhost:8008/api/v1/departments",
      department,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }
}

export class Department {
  public id: number
  public lastUpdatedUtc: Date
  public name: string
}
