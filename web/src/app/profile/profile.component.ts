import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  title = 'Mein Profil';
  name = 'Max Mustermann';
  mail = 'max@mail.mm';
  role = 'Admin';
  loading=false;
  count=0;
  pager:any={}
  sortedData:any=[];

  ngOnInit(): void {
  }

}
