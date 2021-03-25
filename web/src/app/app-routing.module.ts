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

import {PreloadAllModules, RouterModule, Routes} from "@angular/router"
import {NgModule} from "@angular/core"

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  },
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "document-template",
    loadChildren: "./document-template/document-template.module#DocumentTemplateModule"
  },
  {
    path: "evaluation-scheme",
    loadChildren: "./evaluation-scheme/evaluation-scheme.module#EvaluationSchemeModule"
  },
  {
    path: "sign-in",
    loadChildren: "./sign-in/sign-in.module#SignInModule"
  },
  {
    path: "thesis",
    loadChildren: "./thesis/thesis.module#ThesisModule"
  },
  {
    path: "user",
    loadChildren: "./user/user.module#UserModule"
  },
  {
    path: "**",
    redirectTo: "dashboard",
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
