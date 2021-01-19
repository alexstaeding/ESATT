import {EvaluationSchemeComponent} from "./evaluation-scheme.component";
import {EvaluationSchemeDetailComponent} from "./evaluation-scheme-detail/evaluation-scheme-detail.component";
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EvaluationSchemeComponent
  },
  {
    path: ':id',
    component: EvaluationSchemeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationSchemeRoutingModule { }
