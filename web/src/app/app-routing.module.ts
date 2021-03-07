import {PreloadAllModules, RouterModule, Routes} from "@angular/router"
import {NgModule} from "@angular/core"
import {DashboardComponent} from "./dashboard/dashboard.component"
import {AuthGuard} from "./service/auth.guard"
import {LoginComponent} from "./login/login.component"
import {DefaultNavComponent} from "./nav/default-nav/default-nav.component"

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "evaluation-scheme",
    loadChildren: "./evaluation-scheme/evaluation-scheme.module#EvaluationSchemeModule"
  },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfileModule"
  },
  {
    path: "thesis",
    loadChildren: "./thesis/thesis.module#ThesisModule"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
