import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule
    ]
})
export class ProfileModule { }
