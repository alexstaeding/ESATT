import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInUserComponent } from './check-in-user.component';
import { CheckInUserRoutingModule } from './check-in-user-routing.module';
import {MatCardModule} from "@angular/material/card"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {ReactiveFormsModule} from "@angular/forms"



@NgModule({
  declarations: [CheckInUserComponent],
  exports: [
    CheckInUserComponent
  ],
  imports: [
    CommonModule,
    CheckInUserRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class CheckInUserModule { }
