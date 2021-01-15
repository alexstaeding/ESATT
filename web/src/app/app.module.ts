import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavModule} from "./nav/nav.module";
import { ProfileRoutingModule } from './profile/profile-routing.module';
import {ProfileModule} from "./profile/profile.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NavModule,
    ProfileRoutingModule,
    ProfileModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
