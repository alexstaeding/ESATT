import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface Notes{
  Datum: String;
  Notiz: String; 
}

const DATA: Notes[] = [
{ Datum: "01.1.2019", Notiz: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr"},
{Datum:"20.2.2020", Notiz:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}
]

@Component({
  selector: 'app-thesis-detail',
  templateUrl: './thesis-detail.component.html',
  styleUrls: ['./thesis-detail.component.scss']
})
export class ThesisDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  thesisName: String = "BLABL";

  editorEnabled: Boolean = false;

  labelPosition: 'before' | 'after' = 'before';

  value: String = "hallo";

  editableValue: String;

  checked = true;

  statuses = ["Angemeldet", "Vortrag gehalten", "Bewertet", "Abgegeben"];
  fachbereiche = ["Informatik", "ISt", "Physik"];
  geschlechter = ["weiblich", "männlich"];

  displayedColumns: string[] = ['Datum', 'Notiz'];  

  datasource = new MatTableDataSource(DATA);


  thesis = {
    titel_1: "Automatic Generation of TLM to pin-level adapters for SystemC using a DSL",
    titel_2: "Automatic Generation of TLM to pin-level adapters for SystemC using a DSL",
    betreuer: "Mt. Cook",
    gutachter: ["Mrs Stephen", "Mr Miles"],
    status: "Abgegeben",
    abgabe: "18.01.2020",
    verlaengert: "ja",
    neueAbgabe: "20.20.2020",
    student_name: "Harry Potter",
    mat_num: "1234587",
    geschlecht: "männlich",
    email: "harryp@stud.tu-darmstadt.de",
    fachbereich: "Informatik",
    anmeldeDatum: "12.02.2020",
    abgabeDatum: "09.07.2020"
  };

  editableThesis = {...this.thesis};

  enableEditor(): void {
    this.editorEnabled = true;
    this.editableThesis = {...this.thesis};
    console.log(this.editableThesis === this.thesis)
  }

  save(): void{
    this.thesis = {...this.editableThesis};
    this.editorEnabled = false;
  }

  disableEditor(): void{
    this.editableThesis = {...this.thesis};
    this.editorEnabled = false;
  }

  addColumn(): void{
    DATA.push({Datum: new Date().toLocaleDateString(), Notiz:""});
    this.datasource = new MatTableDataSource(DATA);
  }

}
