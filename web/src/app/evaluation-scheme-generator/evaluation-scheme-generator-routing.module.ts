import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationSchemeGeneratorComponent} from "./evaluation-scheme-generator.component";

const routes: Routes = [
  {
    path: 'evaluation-scheme-generator',
    component: EvaluationSchemeGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EvaluationSchemeGeneratorRoutingModule {
}
