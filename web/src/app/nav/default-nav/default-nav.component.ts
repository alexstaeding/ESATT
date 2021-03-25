/*
 *   ESATT - https://www.github.com/alexstaeding/ESATT
 *   Copyright (C) 2021 Bachelor-Praktikum Gruppe 20
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Lesser General Public License for more details.
 *
 *     You should have received a copy of the GNU Lesser General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {BreakpointObserverService} from "../../service/breakpoint-observer.service"
import {Component, OnInit} from "@angular/core"
import {Observable} from "rxjs"
import {Router} from "@angular/router"
import {TranslateService} from "@ngx-translate/core"
import {UserService} from "../../service/user.service"

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
    public userService: UserService,
  ) {
    this.translateService.setDefaultLang("de")
  }

  ngOnInit(): void {
  }

  /**
   * Returns whether the url is activated
   *
   * @param url url to check
   */
  isActive(url: string) {
    return this.router.isActive(url, false)
  }
}
