import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-scheme-generator',
  templateUrl: './evaluation-scheme-generator.component.html',
  styleUrls: ['./evaluation-scheme-generator.component.scss']
})
export class EvaluationSchemeGeneratorComponent implements OnInit {

  criteria = [{criterion: ""}];

  constructor() { }

  ngOnInit(): void {
  }

  addcriterion(){
    this.criteria.push({criterion: ""});
  }

  removecriterion(i){
    this.criteria.splice(i,1);
  }
}
