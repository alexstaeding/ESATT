import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationSchemeComponent} from "./evaluation-scheme.component";

const routes: Routes = [
  {
    path: 'evaluation-scheme',
    component: EvaluationSchemeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EvaluationSchemeRoutingModule {
}
