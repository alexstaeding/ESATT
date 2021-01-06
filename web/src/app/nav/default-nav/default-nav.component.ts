import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'default-nav',
  templateUrl: './default-nav.component.html',
  styleUrls: ['./default-nav.component.scss']
})
export class DefaultNavComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  isActive(url: string) {
    return this.router.isActive(url, false);
  }
}
