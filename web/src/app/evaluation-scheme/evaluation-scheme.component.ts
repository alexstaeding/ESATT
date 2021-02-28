import {Component, OnInit} from "@angular/core"
import {MatDialog} from "@angular/material/dialog"
import {EvaluationSchemeDetailComponent} from "./evaluation-scheme-detail/evaluation-scheme-detail.component"
import {EvaluationSchemePreview, EvaluationSchemeService} from "../service/evaluation-scheme.service"
import {from, Observable} from "rxjs"

@Component({
  selector: "app-evaluation-scheme",
  templateUrl: "./evaluation-scheme.component.html",
  styleUrls: ["./evaluation-scheme.component.scss"]
})
export class EvaluationSchemeComponent implements OnInit {
  columnsScheme = ["name", "description", "createdUtc", "lastUpdatedUtc"]
  data: Observable<EvaluationSchemePreview[]>

  constructor(
    private evaluationSchemeService: EvaluationSchemeService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.initData()
  }

  public initData() {
    this.data = from(this.evaluationSchemeService.getAll())
  }

  openDetail(id: string = null) {
    this.dialog.open(EvaluationSchemeDetailComponent, {
      width: "100%",
      data: {id, component: this}
    })
  }

  showDate(evalSchemeId): string {
    const date = new Date(parseInt(evalSchemeId.substring(0, 8), 16) * 1000)
    return date.toLocaleString()
  }

  calcDate(lastUpdated: Date): string {
    return (new Date(new Date(lastUpdated.toString()).getTime())).toLocaleString()
  }

  descriptionPreview(description): string {
    if (description != null) {
      let preview = description.substring(0, 50)
      if (preview != description) {
        preview = preview + " ..."
      }
      return preview
    }
    return description
  }
}
