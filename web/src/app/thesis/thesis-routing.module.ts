import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {ThesisComponent} from "./thesis.component"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"

const routes: Routes = [
  {
    path: "",
    component: ThesisComponent
  },
  {
    path: ":id",
    component: ThesisDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThesisRoutingModule {
}
