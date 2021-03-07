import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ConfirmationComponent} from "./confirmation.component"
import {MatButtonModule} from "@angular/material/button"
import {MatDialogModule} from "@angular/material/dialog"
import {TranslateModule} from "@ngx-translate/core"



@NgModule({
  declarations: [ConfirmationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
  ]
})
export class ConfirmationModule { }
