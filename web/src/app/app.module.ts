import {NgModule} from "@angular/core"
import {AppComponent} from "./app.component"
import {AppRoutingModule} from "./app-routing.module"
import {BrowserModule} from "@angular/platform-browser"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {HttpClient, HttpClientModule} from "@angular/common/http"
import {NavModule} from "./nav/nav.module"
import {TranslateLoader, TranslateModule} from "@ngx-translate/core"
import {TranslateHttpLoader} from "@ngx-translate/http-loader"

@NgModule({
  declarations: [AppComponent],
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
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/locale/", ".json")
}
