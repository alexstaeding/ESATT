import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"

import {MatButtonModule} from "@angular/material/button"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatCardModule} from "@angular/material/card"
import {MatCheckboxModule} from "@angular/material/checkbox"
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core"
import {MatDialogModule} from "@angular/material/dialog"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatListModule} from "@angular/material/list"
import {MatSelectModule} from "@angular/material/select"
import {MatTableModule} from "@angular/material/table"
import {MatTooltipModule} from "@angular/material/tooltip"
import {ThesisComponent} from "./thesis.component"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"
import {ThesisRoutingModule} from "./thesis-routing.module"
import {TranslateModule} from "@ngx-translate/core"
import {MatTabsModule} from "@angular/material/tabs"
import {MatStepperModule} from "@angular/material/stepper"
import {MatTreeModule} from "@angular/material/tree"
import {MatSnackBarModule} from "@angular/material/snack-bar"


@NgModule({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: "en-GB"},
  ],
  declarations: [ThesisComponent, ThesisDetailComponent],
  imports: [
    CommonModule,
    ThesisRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    TranslateModule,
    MatListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatSnackBarModule,
  ]
})
export class ThesisModule {
}
