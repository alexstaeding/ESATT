import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators, EmailValidator } from "@angular/forms"
import { first } from "rxjs/operators"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"



import {UserService} from "../service/user.service"

@Component({
  selector: "app-check-in-user",
  templateUrl: "./check-in-user.component.html",
  styleUrls: ["./check-in-user.component.scss"]
})
export class CheckInUserComponent implements OnInit {

  registerForm: FormGroup
  loading = false
  submitted = false
  message

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

    // redirect to home if already logged in
   /* if (this.userService.isLoggedIn()) {
      this.router.navigate(["/"])
    }
  }*/

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern("^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$")])],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      userName: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls }

  onSubmit() {
    this.submitted = true

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return
    }

    this.loading = true
    this.userService.register(this.registerForm.value).then(result => {
      if (result) {
        this.message = "success"
        setTimeout(() => {
            this.router.navigate(["/"])
          }
          , 3000)
      }
    }).catch(err => {
      console.log(err)
      this.loading = false
    })

  }
}
