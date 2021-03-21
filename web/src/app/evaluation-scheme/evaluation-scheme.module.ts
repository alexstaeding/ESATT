/*
 *   ESATT - https://www.github.com/alexstaeding/ESATT
 *   Copyright (C) 2021 Bachelor-Praktikum Gruppe 20
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Lesser General Public License for more details.
 *
 *     You should have received a copy of the GNU Lesser General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
    MatTableModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class EvaluationSchemeModule {
}
