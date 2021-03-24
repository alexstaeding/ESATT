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

import {Observable} from "rxjs"
import {HttpResponse} from "@angular/common/http";

export class Redirect {
  public static handle<T>(observable: Observable<HttpResponse<T>>): Promise<T> {
    console.log("foo")
    return observable.toPromise().then(result => {
      console.log("100")
      console.log(result)
      return result
    }, result => {
      console.log("200")
      console.log(result)
      return null
    })
  }
}
