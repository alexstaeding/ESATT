import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout"
import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {map} from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class BreakpointObserverService {

  public isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  public isXLarge: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XLarge)
    .pipe(map(result => result.matches))

  public isLarge: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Large)
    .pipe(map(result => result.matches))

  public isMedium: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Medium)
    .pipe(map(result => result.matches))

  public isSmall: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(map(result => result.matches))

  public isXSmall: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(map(result => result.matches))

  constructor(private breakpointObserver: BreakpointObserver) {
  }
}
