import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FormsModule} from "@angular/forms"
import {MatButtonModule} from "@angular/material/button"
import {MatDialogModule} from "@angular/material/dialog"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatTableModule} from "@angular/material/table"
import {TranslateModule} from "@ngx-translate/core"
import {UserComponent} from "./user.component"
import {UserDetailComponent} from "./user-detail/user-detail.component"
import {UserRoutingModule} from "./user-routing.module"


@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    TranslateModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
