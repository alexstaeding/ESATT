import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile.component";

const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class ProfileRoutingModule { }
