import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProfileComponent } from "./profile.component"
import {ProfileRoutingModule} from "./profile-routing.module"
import {MatDividerModule} from "@angular/material/divider"
import {MatIconModule} from "@angular/material/icon"
import {MatCardModule} from "@angular/material/card"
import {MatGridListModule} from "@angular/material/grid-list"
import {TranslateModule} from "@ngx-translate/core"
import {MatTableModule} from "@angular/material/table"
import {MatFormFieldModule} from "@angular/material/form-field"
import {FormsModule} from "@angular/forms"
import {MatInputModule} from "@angular/material/input"
import {MatTooltipModule} from "@angular/material/tooltip"
import {MatButtonModule} from "@angular/material/button"




@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    TranslateModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class ProfileModule { }


