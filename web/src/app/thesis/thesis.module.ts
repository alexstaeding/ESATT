import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ThesisRoutingModule} from './thesis-routing.module';
import {ThesisComponent} from './thesis.component';
import {ThesisDetailComponent} from './thesis-detail/thesis-detail.component';


@NgModule({
  declarations: [ThesisComponent, ThesisDetailComponent],
  imports: [
    CommonModule,
    ThesisRoutingModule
  ]
})
export class ThesisModule { }
