import {Component, OnInit} from "@angular/core"
import {Subscription} from "rxjs"
import {AuthService} from "../service/auth.service"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
