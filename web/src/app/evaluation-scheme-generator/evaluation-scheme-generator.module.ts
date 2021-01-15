import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationSchemeGeneratorComponent } from './evaluation-scheme-generator.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {EvaluationSchemeGeneratorRoutingModule} from "./evaluation-scheme-generator-routing.module";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";




@NgModule({
  declarations: [EvaluationSchemeGeneratorComponent],
    imports: [
        CommonModule,
        EvaluationSchemeGeneratorRoutingModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class EvaluationSchemeGeneratorModule { }
