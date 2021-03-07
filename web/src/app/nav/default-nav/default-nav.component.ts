import {BreakpointObserverService} from "../../service/breakpoint-observer.service"
import {Component, OnInit} from "@angular/core"
import {Observable} from "rxjs"
import {Router} from "@angular/router"
import {TranslateService} from "@ngx-translate/core"
import {AuthService} from "../../service/auth.service"

@Component({
  selector: "app-default-nav",
  templateUrl: "./default-nav.component.html",
  styleUrls: ["./default-nav.component.scss"]
})
export class DefaultNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserverService.isHandset
  isLoggedIn$: Observable<boolean>

  constructor(
    private breakpointObserverService: BreakpointObserverService,
    private router: Router,
    private authService: AuthService,
    public translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang("de")
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn
  }

  isActive(url: string) {
    return this.router.isActive(url, false)
  }

  onLogout() {
    this.authService.logout()
  }


}
