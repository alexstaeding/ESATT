import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"

import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatCheckboxModule} from "@angular/material/checkbox"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatTableModule} from "@angular/material/table"
import {ThesisComponent} from "./thesis.component"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"
import {ThesisRoutingModule} from "./thesis-routing.module"
import {TranslateModule} from "@ngx-translate/core"


@NgModule({
  declarations: [ThesisComponent, ThesisDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ThesisRoutingModule,
    TranslateModule,
  ]
})
export class ThesisModule {
}
