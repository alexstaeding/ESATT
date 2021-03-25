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

import {DocumentTemplateComponent} from "./document-template.component"
import {DocumentTemplateDetailComponent} from "./document-template-detail/document-template-detail.component"
import {DocumentTemplateRoutingModule} from "./document-template-routing.module"
import {DocumentTemplateThesisComponent} from "./document-template-thesis/document-template-thesis.component"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatDialogModule} from "@angular/material/dialog"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatGridListModule} from "@angular/material/grid-list"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatNativeDateModule} from "@angular/material/core"
import {MatSelectModule} from "@angular/material/select"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatTableModule} from "@angular/material/table"
import {MatTabsModule} from "@angular/material/tabs"
import {MatTooltipModule} from "@angular/material/tooltip"
import {MatTreeModule} from "@angular/material/tree"
import {TranslateModule} from "@ngx-translate/core"


@NgModule({
  declarations: [DocumentTemplateComponent, DocumentTemplateDetailComponent, DocumentTemplateThesisComponent],
  imports: [
    CommonModule,
    DocumentTemplateRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class DocumentTemplateModule {
}
