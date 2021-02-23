import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {CheckInUserComponent} from "./check-in-user.component"



const routes: Routes = [
  {
    path: "",
    component: CheckInUserComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckInUserRoutingModule {
}
