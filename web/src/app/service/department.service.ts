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

  /**
   * Loads all departments from the database
   */
  public async getAll(): Promise<Department[]> {
    return this.http.get<Department[]>("http://localhost:8008/api/v1/departments").toPromise()
  }

  /**
   * Loads department with specified id from the database
   *
   * @param id id of the department
   */
  public async get(id: string): Promise<Department> {
    return this.http.get<Department>("http://localhost:8008/api/v1/departments/" + id).toPromise()
  }

  /**
   * Adds a new department to the database
   *
   * @param department department to be added
   */
  public async create(department: Department): Promise<Department> {
    return this.http.post<Department>("http://localhost:8008/api/v1/departments",
      department,
      {
        headers: this.headers,
        withCredentials: true,
      }).toPromise()
  }

  /**
   * Overwrites changed fields
   *
   * @param department department with the changed fields
   */
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
