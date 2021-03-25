import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"

import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatMenuModule} from "@angular/material/menu"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatToolbarModule} from "@angular/material/toolbar"
import {ReactiveFormsModule} from "@angular/forms"
import {SignInComponent} from "./sign-in.component"
import {SignInRoutingModule} from "./sign-in-routing.module"
import {TranslateModule} from "@ngx-translate/core"


@NgModule({
  declarations: [SignInComponent],
  exports: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SignInRoutingModule,
    TranslateModule,
  ]
})
export class SignInModule {
}
