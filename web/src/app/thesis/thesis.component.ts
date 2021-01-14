import { Component, OnInit } from '@angular/core';

export interface ThesisArray {
  studentFirstName: string;
  studentLastName: string;
  thesisTopic: string;
  profFirstName: string;
  profLastName: string;
  status: string;
}

const THESIS_DATA: ThesisArray[] = [
  {studentFirstName: 'Max', studentLastName: 'Mustermann', thesisTopic: 'Testthema', profFirstName: 'Leonard', profLastName: 'Holbrecht', status: 'Vortrag gehalten'},
  {studentFirstName: 'Michael', studentLastName: 'Hock', thesisTopic: 'Alle Arten von Insekten', profFirstName: 'Lukas', profLastName: 'Müller', status: 'Abgeschlossen'},
  {studentFirstName: 'Theodor', studentLastName: 'Ludwig', thesisTopic: 'Sortieralgorithmen', profFirstName: 'Hans', profLastName: 'Bauer', status: 'Offen'},
];

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.scss']
})
export class ThesisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['studentFirstName', 'studentLastName', 'thesisTopic', 'profFirstName', 'profLastName', 'status'];
  dataSource = THESIS_DATA;
}
