import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThesisRoutingModule } from './thesis-routing.module';
import { ThesisComponent } from './thesis.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ThesisComponent],
  imports: [
    CommonModule,
    ThesisRoutingModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ThesisModule { }
