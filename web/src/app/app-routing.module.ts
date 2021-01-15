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
    path: "evaluation-scheme",
    loadChildren: "./evaluation-scheme/evaluation-scheme.module#EvaluationSchemeModule"
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: "thesis",
    loadChildren: "./thesis/thesis.module#ThesisModule"
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
