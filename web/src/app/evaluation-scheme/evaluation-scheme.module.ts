import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"

import {EvaluationSchemeRoutingModule} from "./evaluation-scheme-routing.module"
import {EvaluationSchemeComponent} from "./evaluation-scheme.component"
import {EvaluationSchemeDetailComponent} from "./evaluation-scheme-detail/evaluation-scheme-detail.component"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatDialogModule} from "@angular/material/dialog"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatSortModule} from "@angular/material/sort"
import {MatTableModule} from "@angular/material/table"
import {MatTreeModule} from "@angular/material/tree"
import {MatTooltipModule} from "@angular/material/tooltip"
import {TranslateModule} from "@ngx-translate/core"


@NgModule({
  declarations: [EvaluationSchemeComponent, EvaluationSchemeDetailComponent],
  imports: [
    CommonModule,
    EvaluationSchemeRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class EvaluationSchemeModule {
}
