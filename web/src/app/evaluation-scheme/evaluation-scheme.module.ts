import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationSchemeComponent } from './evaluation-scheme.component';
import {EvaluationSchemeRoutingModule} from "./evaluation-scheme-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [EvaluationSchemeComponent],
  imports: [
    CommonModule,
    EvaluationSchemeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class EvaluationSchemeModule {
}
