import {Component, OnInit} from "@angular/core"
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../service/user.service"
import {ActivatedRoute, Router} from "@angular/router"
import {Observable} from "rxjs"
import {TranslateService} from "@ngx-translate/core"

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
  )
  {
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

  signIn() {
    if (this.form.valid) {
      console.log(this.f.userName.value)
      this.userService.signIn(this.f.userName.value, this.f.password.value)
    }
    this.router.navigate(["/dashboard"])
    this.formSubmitAttempt = true
  }

}
