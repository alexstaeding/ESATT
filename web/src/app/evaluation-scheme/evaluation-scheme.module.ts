import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EvaluationSchemeRoutingModule} from './evaluation-scheme-routing.module';
import {EvaluationSchemeComponent} from './evaluation-scheme.component';
import {EvaluationSchemeDetailComponent} from './evaluation-scheme-detail/evaluation-scheme-detail.component';


@NgModule({
  declarations: [EvaluationSchemeComponent, EvaluationSchemeDetailComponent],
  imports: [
    CommonModule,
    EvaluationSchemeRoutingModule
  ]
})
export class EvaluationSchemeModule { }
