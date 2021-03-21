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
