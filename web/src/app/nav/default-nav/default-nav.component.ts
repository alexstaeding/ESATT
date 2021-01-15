import {BreakpointObserverService} from "../../service/breakpoint-observer.service"
import {Component, OnInit} from "@angular/core"
import {Observable} from "rxjs"
import {Router} from "@angular/router"
import {TranslateService} from "@ngx-translate/core"

@Component({
  selector: "app-default-nav",
  templateUrl: "./default-nav.component.html",
  styleUrls: ["./default-nav.component.scss"]
})
export class DefaultNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserverService.isHandset

  constructor(
    private breakpointObserverService: BreakpointObserverService,
    private router: Router,
    public translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('de')
  }

  ngOnInit(): void {
  }

  isActive(url: string) {
    return this.router.isActive(url, false)
  }
}
