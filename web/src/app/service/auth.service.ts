import {Injectable} from "@angular/core"
import {Router} from "@angular/router"
import {BehaviorSubject} from "rxjs"
import {User} from "./user.service"
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {environment} from "../../environments/environment"
import {map} from "rxjs/operators"


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.tokenAvailable())

  get isLoggedIn() {
    return this.loggedIn.asObservable()
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    })
  }


  login(user: User) {
    if (user.userName !== "" && user.password !== "") {
      this.loggedIn.next(true)
      localStorage.setItem("token", "true")
      this.router.navigate(["/dashboard"])
    }
  }

  login_ldap(username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + "/login", {username, password}, {headers: this.headers, withCredentials: true}).pipe(map(user => {
      console.log("HERE")
        if (user && user.token) {
          localStorage.setItem("Token", user.token)
          localStorage.setItem("Timestamp", "" + new Date())
          this.loggedIn.next(true)
          this.router.navigate(["/dashboard"])
          return user
        }
        console.log(user)

        return user
      }))
  }

  logout() {
    this.loggedIn.next(false)
    localStorage.removeItem("token")
    this.router.navigate(["/login"])
  }

  private tokenAvailable(): boolean {
    return !!localStorage.getItem("token")
  }
}
