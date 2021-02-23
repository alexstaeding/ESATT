import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FormsModule} from "@angular/forms"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatDividerModule} from "@angular/material/divider"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatGridListModule} from "@angular/material/grid-list"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatTooltipModule} from "@angular/material/tooltip"
import {ProfileComponent} from "./profile.component"
import {ProfileRoutingModule} from "./profile-routing.module"
import {TranslateModule} from "@ngx-translate/core"
import {MatDialogModule} from "@angular/material/dialog"

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ProfileRoutingModule,
    TranslateModule,
    MatDialogModule,
  ]
})
export class ProfileModule {
}
