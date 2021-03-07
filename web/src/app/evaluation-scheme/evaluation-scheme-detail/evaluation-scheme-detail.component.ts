import {Component, Inject, OnInit, ViewChild} from "@angular/core"
import {Criterion, EvaluationScheme, EvaluationSchemeService} from "../../service/evaluation-scheme.service"
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {MatSnackBar} from "@angular/material/snack-bar"
import {MatTree, MatTreeNestedDataSource} from "@angular/material/tree"
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog"
import {NestedTreeControl} from "@angular/cdk/tree"
import {TranslateService} from "@ngx-translate/core"
import {ConfirmationComponent} from "../../confirmation/confirmation.component"

@Component({
  selector: "app-evaluation-scheme-detail",
  templateUrl: "./evaluation-scheme-detail.component.html",
  styleUrls: ["./evaluation-scheme-detail.component.scss"]
})
export class EvaluationSchemeDetailComponent implements OnInit {
  treeControl = new NestedTreeControl<Criterion>(node => node.criteria)
  dataSource = new MatTreeNestedDataSource<Criterion>()
  parentMap = new Map<Criterion, Criterion>()
  originalEvaluationScheme: EvaluationScheme
  evaluationScheme: EvaluationScheme = new EvaluationScheme()
  evaluationSchemeWithChanges: EvaluationScheme
  refMode = Mode
  mode: Mode
  weightGroup: FormGroup
  @ViewChild("evaluationSchemeTree") tree: MatTree<Criterion>
  hasChild = (_: number, node: Criterion) => !!node.criteria && node.criteria.length > 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private evaluationSchemeService: EvaluationSchemeService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private confirmationDialog: MatDialog,
  ) {
    this.weightGroup = formBuilder.group({})
  }

  ngOnInit() {
    if (this.data.id == null) {
      this.evaluationScheme = {
        id: null, name: null, description: null, criteria: [], lastUpdatedUtc: null
      }
      this.dataSource.data = this.evaluationScheme.criteria
      this.mode = Mode.NEW
    } else {
      this.evaluationSchemeService.get(this.data.id).then(result => {
        this.originalEvaluationScheme = this.deepCopy(result)
        this.setAllCounters(this.originalEvaluationScheme.criteria)
        this.resetEvaluationScheme()
      })
    }
  }

  resetEvaluationScheme() {
    const copy = this.deepCopy(this.originalEvaluationScheme)
    this.setAllCounters(copy.criteria)
    this.evaluationScheme = copy
    this.dataSource.data = copy.criteria
    this.mode = Mode.NORMAL
  }

  deepCopy(evaluationScheme: EvaluationScheme): EvaluationScheme {
    const copy = new EvaluationScheme()
    copy.id = evaluationScheme.id
    copy.name = evaluationScheme.name
    copy.description = evaluationScheme.description
    copy.criteria = this.copyCriteria(evaluationScheme.criteria)
    return copy
  }

  copyCriteria(criteria: Criterion[]): Criterion[] {
    if (criteria == null || criteria.length === 0) {
      return []
    }
    const copy: Criterion[] = []
    for (const criterion of criteria) {
      const newCriterion = new Criterion()
      newCriterion.counter = criterion.counter
      newCriterion.name = criterion.name
      newCriterion.description = criterion.description
      newCriterion.weight = criterion.weight
      newCriterion.criteria = this.copyCriteria(criterion.criteria)
      copy.push(newCriterion)
    }
    return copy
  }

  setAllCounters(criteria: Criterion[], parent: Criterion = null, preCounter: string = "") {
    if (criteria == null || criteria.length === 0) {
      return
    }
    criteria.forEach((criterion, index) => {
      criterion.counter = preCounter + (index + 1).toString() + "."
      this.weightGroup.addControl("weight" + criterion.counter,
        new FormControl(null, Validators.pattern(/^0(\.([0-9]+)?)?$|^1(\.(0)?)?$/)))
      this.parentMap.set(criterion, parent)
      this.setAllCounters(criterion.criteria, criterion, criterion.counter)
    })
  }

  changeToEdit() {
    this.originalEvaluationScheme = this.deepCopy(this.evaluationScheme)
    this.mode = Mode.EDIT
  }

  save() {
    this.evaluationSchemeWithChanges = new EvaluationScheme()
    this.evaluationSchemeWithChanges.id = this.evaluationScheme.id
    if (this.evaluationScheme.name !== this.originalEvaluationScheme.name) {
      this.evaluationSchemeWithChanges.name = this.evaluationScheme.name
    }
    if (this.evaluationScheme.description !== this.originalEvaluationScheme.description) {
      this.evaluationSchemeWithChanges.description = this.evaluationScheme.description
    }
    if (!this.equalCriteriaList(this.evaluationScheme.criteria, this.originalEvaluationScheme.criteria)) {
      this.evaluationSchemeWithChanges.criteria = this.evaluationScheme.criteria
    }
    this.evaluationSchemeService.update(this.evaluationSchemeWithChanges)
    this.mode = Mode.NORMAL
  }

  equalCriteriaList(first: Criterion[], second: Criterion[]): boolean {
    if (first.length !== second.length) {
      return false
    }
    for (let i = 0; i < first.length; i++) {
      if (first[i].name !== second[i].name || first[i].weight !== second[i].weight
        || first[i].description !== second[i].description) {
        return false
      }
      if (!this.equalCriteriaList(first[i].criteria, second[i].criteria)) {
        return false
      }
    }
    return true
  }

  create() {
    this.originalEvaluationScheme = this.deepCopy(this.evaluationScheme)
    this.evaluationSchemeService.create(this.evaluationScheme)
    this.mode = Mode.NORMAL
  }

  addCriterion() {
    const newCriterion = {
      name: null,
      description: null,
      weight: null,
      criteria: [],
      counter: (this.evaluationScheme.criteria.length + 1).toString() + "."
    } as Criterion
    this.weightGroup.addControl("weight" + newCriterion.counter,
      new FormControl(null, Validators.pattern(/^0(\.([0-9]+)?)?$|^1(\.(0)?)?$/)))
    this.parentMap.set(newCriterion, null)
    this.evaluationScheme.criteria.push(newCriterion)
    this.updateTree()
  }

  addSubCriterion(node) {
    const newCriterion = {
      name: null,
      description: null,
      weight: null,
      criteria: [],
      counter: node.counter + (node.criteria.length + 1).toString() + "."
    } as Criterion
    this.weightGroup.addControl("weight" + newCriterion.counter,
      new FormControl(null, Validators.pattern(/^0(\.([0-9]+)?)?$|^1(\.(0)?)?$/)))
    this.parentMap.set(newCriterion, node)
    node.criteria.push(newCriterion)
    this.updateTree()
  }

  updateTree() {
    const data = this.dataSource.data
    this.dataSource.data = null
    this.dataSource.data = data
  }

  removeCriterion(node) {
    this.weightGroup.controls = {}
    const parent = this.parentMap.get(node)
    if (!!parent) {
      const index = parent.criteria.indexOf(node)
      parent.criteria.splice(index, 1)
      this.parentMap.delete(node)
      this.setAllCounters(this.evaluationScheme.criteria)
    } else {
      const index = this.evaluationScheme.criteria.indexOf(node)
      this.evaluationScheme.criteria.splice(index, 1)
      this.setAllCounters(this.evaluationScheme.criteria)
    }
    this.updateTree()
  }

  refresh() {
    window.location.reload()
  }

  calcRestWeight(node): number {
    const parent = this.parentMap.get(node)
    let criteria
    if (parent == null) {
      criteria = this.evaluationScheme.criteria
    } else {
      criteria = parent.criteria
    }
    let weight = 1
    for (const criterion of criteria) {
      weight = weight - criterion.weight
    }
    return (Math.round(weight * 10000000000) / 10000000000)
  }

  showTotalWeightError() {
    this.snackBar.open(this.translate.instant("evaluation-scheme.detail.total-weight-error"), null, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["red-snackbar"]
    })
  }

  showNameMissingError() {
    this.snackBar.open(this.translate.instant("evaluation-scheme.detail.name-missing-error"), null, {
      duration: 3000,
      verticalPosition: "top",
      panelClass: ["red-snackbar"]
    })
  }

  createWithWeightControl() {
    if (this.evaluationScheme.name == null || this.evaluationScheme.name === "") {
      this.showNameMissingError()
    } else if (this.allWeightsCorrect(this.evaluationScheme.criteria)) {
      this.create()
      this.refresh()
    } else {
      this.showTotalWeightError()
    }
  }

  saveWithWeightControl() {
    if (this.evaluationScheme.name == null || this.evaluationScheme.name === "") {
      this.showNameMissingError()
    } else if (this.allWeightsCorrect(this.evaluationScheme.criteria)) {
      this.save()
      this.refresh()
    } else {
      this.showTotalWeightError()
    }
  }

  private allWeightsCorrect(criteria): boolean {
    if (criteria == null || criteria.length === 0) {
      return true
    }
    let weight = 1
    for (const criterion of criteria) {
      if (criterion.weight == null) {
        return false
      }
      weight = weight - criterion.weight
    }
    if ((Math.round(weight * 10000000000) / 10000000000) !== 0) {
      return false
    }
    for (const criterion of criteria) {
      if (!this.allWeightsCorrect(criterion.criteria)) {
        return false
      }
    }
    return true
  }

  deleteScheme() {
    const confDialogRef = this.confirmationDialog.open(ConfirmationComponent, {
      data: this.translate.instant("confirmation.messageEvaluationScheme")
    })

    confDialogRef.afterClosed().subscribe(resp => {
      if(resp === "confirm") {
        this.evaluationSchemeService.delete(this.data.id)
        this.mode = Mode.NORMAL
        this.refresh()
      }
    })
  }
}

export enum Mode {
  EDIT,
  NEW,
  NORMAL,
}
