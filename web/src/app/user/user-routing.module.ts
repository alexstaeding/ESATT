import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {UserComponent} from "./user.component"
import {UserDetailComponent} from "./user-detail/user-detail.component"

const routes: Routes = [
  {
    path: "",
    component: UserComponent
  },
  {
    path: ":id",
    component: UserDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
