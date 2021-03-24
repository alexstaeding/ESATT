import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"

import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {ReactiveFormsModule} from "@angular/forms"
import {SignInComponent} from "./sign-in.component"
import {SignInRoutingModule} from "./sign-in-routing.module"
import {TranslateModule} from "@ngx-translate/core"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatMenuModule} from "@angular/material/menu"
import {MatIconModule} from "@angular/material/icon"
import {MatSnackBarModule} from "@angular/material/snack-bar"

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SignInRoutingModule,
    TranslateModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class SignInModule {
}
