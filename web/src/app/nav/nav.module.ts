import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultNavComponent} from './default-nav/default-nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    DefaultNavComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
  ],
  exports: [
    DefaultNavComponent
  ]
})
export class NavModule {
}
