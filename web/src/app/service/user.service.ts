import {Injectable} from "@angular/core"
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: "root"
})
export class UserService {

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
  ): Promise<User[]> {
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
    return this.http.get<User[]>("http://localhost:8008/api/v1/users",
      {
        headers: headerMap
      }).toPromise()
  }

  public async get(id: string): Promise<User> {
    return this.http.get<User>("http://localhost:8008/api/v1/users/" + id).toPromise()
  }

  public async getUser(): Promise<User> {
    return this.http.get<User>("http://localhost:8008/api/v1/currentUser").toPromise()
  }

  public async create(user: User): Promise<User> {
    return this.http.post<User>("http://localhost:8008/api/v1/users",
      user,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }

  public async update(user: User): Promise<User> {
    return this.http.put<User>("http://localhost:8008/api/v1/users",
      user,
      {
        headers: this.headers,
        withCredentials: true
      }).toPromise()
  }
}

export class User {
  public id: string
  public lastUpdatedUtc: Date
  public userName: string
  public email: string
  public firstName: string
  public lastName: string
}
