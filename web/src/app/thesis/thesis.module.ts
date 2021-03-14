import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"

import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatCheckboxModule} from "@angular/material/checkbox"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatDialogModule} from "@angular/material/dialog"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatListModule} from "@angular/material/list"
import {MatSelectModule} from "@angular/material/select"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatSortModule} from "@angular/material/sort"
import {MatStepperModule} from "@angular/material/stepper"
import {MatTableModule} from "@angular/material/table"
import {MatTabsModule} from "@angular/material/tabs"
import {MatTooltipModule} from "@angular/material/tooltip"
import {MatTreeModule} from "@angular/material/tree"
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core"
import {ThesisComponent} from "./thesis.component"
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component"
import {ThesisRoutingModule} from "./thesis-routing.module"
import {TranslateModule} from "@ngx-translate/core"


@NgModule({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: "en-GB"},
  ],
  declarations: [ThesisComponent, ThesisDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    ThesisRoutingModule,
    TranslateModule,
  ]
})
export class ThesisModule {
}
