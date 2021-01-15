import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThesisDetailRoutingModule } from './thesis-detail-routing.module';
import { ThesisDetailComponent } from './thesis-detail.component';

import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [ThesisDetailComponent],
  imports: [
    CommonModule,
    ThesisDetailRoutingModule,
    MatTableModule, 
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class ThesisDetailModule { }
