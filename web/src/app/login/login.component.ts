import {Component, OnInit} from "@angular/core"
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {AuthService} from "../service/auth.service"
import {ActivatedRoute, Router} from "@angular/router"
import {first} from "rxjs/operators"


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup
  private formSubmitAttempt: boolean
  returnUrl: string

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    })
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/"
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    )
  }

  get f() {
    return this.form.controls
  }

  onSubmit() {
    if (this.form.valid) {

      this.authService.login_ldap(this.f.userName.value, this.f.password.value).pipe(first()).subscribe(data => {
        this.router.navigate([this.returnUrl])
      }, error => {
        console.log(error)
      })
    }
    this.formSubmitAttempt = true
  }
}
