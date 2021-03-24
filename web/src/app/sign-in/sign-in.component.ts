import {Component, OnInit} from "@angular/core"
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {LoginStatus, UserService} from "../service/user.service"
import {ActivatedRoute, Router} from "@angular/router"
import {TranslateService} from "@ngx-translate/core"
import {MatSnackBar} from "@angular/material/snack-bar"

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  form: FormGroup
  private formSubmitAttempt: boolean
  returnUrl: string

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public translateService: TranslateService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    })
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/"
  }

  get f() {
    return this.form.controls
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    )
  }

  showCredentialsError() {
    this.snackBar.open(this.translateService.instant("user.login.error"), null, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["red-snackbar"]
    })
  }

  showSuccess() {
    this.snackBar.open(this.translateService.instant("user.login.success"), null, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["green-snackbar"]
    })
  }

  signIn() {
    if (this.form.valid) {
      this.userService.signIn(this.f.userName.value, this.f.password.value).then(result => {
        if (result === LoginStatus.SUCCESS) {
          this.showSuccess()
          const self = this
          setTimeout(() => {
            console.log("Navigating...")
            self.router.navigate(["/dashboard"])
          }, 1500)
          this.formSubmitAttempt = true
        } else {
          this.showCredentialsError()
        }
      })
    }

  }

}
