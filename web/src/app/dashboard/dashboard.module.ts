import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {DashboardRoutingModule} from "./dashboard-routing.module"
import {DashboardComponent} from "./dashboard.component"
import {MatButtonModule} from "@angular/material/button"
import {RouterModule} from "@angular/router"

@NgModule({
  declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatButtonModule,
        RouterModule,
    ]
})
export class DashboardModule {
}
