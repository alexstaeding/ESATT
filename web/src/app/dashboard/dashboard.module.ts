import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {DashboardComponent} from "./dashboard.component"
import {DashboardRoutingModule} from "./dashboard-routing.module"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatCheckboxModule} from "@angular/material/checkbox"
import {MatDialogModule} from "@angular/material/dialog"
import {MatDividerModule} from "@angular/material/divider"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatGridListModule} from "@angular/material/grid-list"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatTableModule} from "@angular/material/table"
import {MatTooltipModule} from "@angular/material/tooltip"
import {TranslateModule} from "@ngx-translate/core"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatSelectModule} from "@angular/material/select"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatNativeDateModule} from "@angular/material/core"

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class DashboardModule {
}
