import {NgModule} from "@angular/core"
import {AppComponent} from "./app.component"
import {AppRoutingModule} from "./app-routing.module"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {BrowserModule} from "@angular/platform-browser"
import {HttpClient, HttpClientModule} from "@angular/common/http"
import {NavModule} from "./nav/nav.module"
import {TranslateLoader, TranslateModule} from "@ngx-translate/core"
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatCardModule} from "@angular/material/card"
import {ReactiveFormsModule} from "@angular/forms"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatButtonModule} from "@angular/material/button"
import {AuthService} from "./service/auth.service"
import {LoginComponent} from "./login/login.component"
import {AuthGuard} from "./service/auth.guard"

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  providers:[
    AuthService,
    AuthGuard
  ]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/locale/", ".json")
}
