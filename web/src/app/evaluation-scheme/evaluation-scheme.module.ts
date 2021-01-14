import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EvaluationSchemeRoutingModule} from './evaluation-scheme-routing.module';
import {EvaluationSchemeComponent} from './evaluation-scheme.component';
import {EvaluationSchemeDetailComponent} from './evaluation-scheme-detail/evaluation-scheme-detail.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTreeModule} from "@angular/material/tree";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [EvaluationSchemeComponent, EvaluationSchemeDetailComponent],
  imports: [
    CommonModule,
    EvaluationSchemeRoutingModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    TranslateModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MatTreeModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ]
})
export class EvaluationSchemeModule {
}
