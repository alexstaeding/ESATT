import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ThesisComponent} from "./thesis.component";

const routes: Routes = [
  {
       path: '',
       component: ThesisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThesisRoutingModule { }
