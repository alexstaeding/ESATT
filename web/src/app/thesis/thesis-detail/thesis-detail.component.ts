import {Component, Inject, OnInit} from "@angular/core"
import {Department, DepartmentService} from "../../service/department.service"
import {MatTableDataSource} from "@angular/material/table"
import {MAT_DIALOG_DATA} from "@angular/material/dialog"
import {Grade, Grading, Note, Status, Thesis, ThesisService} from "../../service/thesis.service"
import {User, UserService} from "../../service/user.service"
import {EvaluationSchemePreview, EvaluationSchemeService} from "../../service/evaluation-scheme.service"
import {SelectionModel} from "@angular/cdk/collections"
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {from, Observable} from "rxjs"
import {NestedTreeControl} from "@angular/cdk/tree"
import {MatTreeNestedDataSource} from "@angular/material/tree"
import {MatSnackBar} from "@angular/material/snack-bar"
import {TranslateService} from "@ngx-translate/core"


@Component({
  selector: "app-thesis-detail",
  templateUrl: "./thesis-detail.component.html",
  styleUrls: ["./thesis-detail.component.scss"]
})
export class ThesisDetailComponent implements OnInit {

  public Gender = Gender
  selectedTab = 0
  dialog: HTMLElement
  originalThesis: Thesis
  thesis: Thesis = new Thesis
  thesisWithChanges: Thesis
  datasource: MatTableDataSource<Note>
  refMode = Mode
  genders = Object.values(Gender)
  users: User[] = []
  departments: Department[] = []
  supervisors: string[] = []
  selection = new SelectionModel<Note>(true, [])
  mode: Mode = Mode.NORMAL
  currentDate: Date = new Date

  grading: Grading = new Grading

  firstFormGroup: FormGroup
  secondFormGroup: FormGroup

  gradeGroup: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private thesisService: ThesisService,
    private evaluationSchemeService: EvaluationSchemeService,
    private userService: UserService,
    private departmentService: DepartmentService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    })
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    })
    this.gradeGroup = _formBuilder.group({})
  }

  ngOnInit(): void {
    this.userService.getAll().then(result => {
      this.users = result
    })
    this.departmentService.getAll().then(result => {
      this.departments = result
    })
    if (this.data.id == null) {
      this.thesis = new Thesis
      this.thesis.status = new Status
      this.thesis.notes = new Array<Note>()
      this.mode = Mode.NEW
      let data: Note[] = this.thesis.notes
      this.datasource = new MatTableDataSource<Note>(data)
      this.grading = null
    } else {
      this.thesis.status = new Status
      this.thesisService.get(this.data.id).then(result => {
        this.originalThesis = this.deepCopyThesis(result)
        if (this.originalThesis.grading != null) {
          this.setAllCounters(this.originalThesis.grading.grades)
        }
        this.resetThesis()
      })
    }
    this.evaluationSchemeData = from(this.evaluationSchemeService.getAll())
  }

  resetThesis() {
    const copy = this.deepCopyThesis(this.originalThesis)
    this.thesis = copy
    this.grading = this.deepCopyGrading(copy.grading)
    if (copy.grading != null) {
      this.dataSource.data = this.grading.grades
    }
    if (this.thesis.notes == null) {
      this.thesis.notes = []
      this.originalThesis.notes = []
    }
    let data: Note[] = this.thesis.notes
    this.datasource = new MatTableDataSource<Note>(data)
    this.mode = Mode.NORMAL
    if (this.mode == this.refMode.NORMAL && this.thesis.grading == null) {
      this.selectedTab = 0
    }
  }

  displayedColumns: string[] = ["checked", "Datum", "Notiz"]


  changeToEdit(): void {
    this.originalThesis = this.deepCopyThesis(this.thesis)
    this.mode = Mode.EDIT
  }

  second: Grading = new Grading
  first: Grading = new Grading

  save(): void {
    this.calcGrade()
    if (this.thesis.calculatedGrade != null && this.thesis.calculatedGrade.toString() == "NaN") {
      this.showGradeError()
    } else {
      this.thesis.grading = this.deepCopyGrading(this.grading)
      this.thesisWithChanges = new Thesis
      this.thesisWithChanges.id = this.thesis.id
      if (this.thesis.firstName != this.originalThesis.firstName) {
        this.thesisWithChanges.firstName = this.thesis.firstName
      }
      if (this.thesis.lastName != this.originalThesis.lastName) {
        this.thesisWithChanges.lastName = this.thesis.lastName
      }
      if (this.thesis.gender != this.originalThesis.gender) {
        this.thesisWithChanges.gender = this.thesis.gender
      }
      if (this.thesis.email != this.originalThesis.email) {
        this.thesisWithChanges.email = this.thesis.email
      }
      if (this.thesis.studentId != this.originalThesis.studentId) {
        this.thesisWithChanges.studentId = this.thesis.studentId
      }
      if (this.thesis.supervisorId != this.originalThesis.supervisorId) {
        this.thesisWithChanges.supervisorId = this.thesis.supervisorId
      }
      if (this.thesis.supervisorFirstName != this.originalThesis.supervisorFirstName) {
        this.thesisWithChanges.supervisorFirstName = this.thesis.supervisorFirstName
      }
      if (this.thesis.supervisorLastName != this.originalThesis.supervisorLastName) {
        this.thesisWithChanges.supervisorLastName = this.thesis.supervisorLastName
      }
      if (this.thesis.evaluatorFirstName != this.originalThesis.evaluatorFirstName) {
        this.thesisWithChanges.evaluatorFirstName = this.thesis.evaluatorFirstName
      }
      if (this.thesis.evaluatorLastName != this.originalThesis.evaluatorLastName) {
        this.thesisWithChanges.evaluatorLastName = this.thesis.evaluatorLastName
      }
      if (this.thesis.thesisType != this.originalThesis.thesisType) {
        this.thesisWithChanges.thesisType = this.thesis.thesisType
      }
      if (this.thesis.departmentId != this.originalThesis.departmentId) {
        this.thesisWithChanges.departmentId = this.thesis.departmentId
      }
      if (this.thesis.departmentName != this.originalThesis.departmentName) {
        this.thesisWithChanges.departmentName = this.thesis.departmentName
      }
      if (this.thesis.subject != this.originalThesis.subject) {
        this.thesisWithChanges.subject = this.thesis.subject
      }
      if (this.thesis.title != this.originalThesis.title) {
        this.thesisWithChanges.title = this.thesis.title
      }
      if (!this.equalStatus(this.thesis.status, this.originalThesis.status)) {
        this.thesisWithChanges.status = this.thesis.status
      }
      if (!this.equalNotes(this.thesis.notes, this.originalThesis.notes)) {
        this.thesisWithChanges.notes = this.thesis.notes
      }
      if (this.thesis.grade != this.originalThesis.grade) {
        this.thesisWithChanges.grade = this.thesis.grade
      }
      if (this.thesis.calculatedGrade != this.originalThesis.calculatedGrade) {
        this.thesisWithChanges.calculatedGrade = this.thesis.calculatedGrade
      }
      if (!this.equalGrading(this.thesis.grading, this.originalThesis.grading)) {
        this.thesisWithChanges.grading = new Grading()
        this.thesisWithChanges.grading = this.thesis.grading
      }
      this.first = this.thesisWithChanges.grading
      this.second = this.first
      this.thesisService.update(this.thesisWithChanges)
      this.mode = Mode.NORMAL
      this.refresh()
    }
  }

  showGradeError() {
    this.snackBar.open(this.translate.instant("thesis-detail.grading.total-gradeError"), null, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["red-snackbar"]
    })
  }

  equalStatus(first: Status, second: Status): boolean {
    return !(first.allocationDateUtc != second.allocationDateUtc || first.signUpUtc != second.signUpUtc ||
      first.presentationUtc != second.presentationUtc || first.dueDateUtc != second.dueDateUtc ||
      first.extendedDueDateUtc != second.extendedDueDateUtc || first.submittedUtc != second.submittedUtc ||
      first.gradedUtc != second.gradedUtc || first.reportCreatedUtc != second.reportCreatedUtc)
  }

  equalNotes(first: Note[], second: Note[]): boolean {
    if (first.length != second.length) {
      return false
    }
    for (let _i = 0; _i < first.length; _i++) {
      if (first[_i].creatorId != second[_i].creatorId || first[_i].createdUtc != second[_i].createdUtc
        || first[_i].content != second[_i].content) {
        return false
      }
    }
    return true
  }

  equalGrading(first: Grading, second: Grading): boolean {
    if (first == null && second == null) {
      return true
    }
    if (first == null && second != null || second == null && first != null) {
      return false
    }
    return this.equalGrades(first.grades, second.grades)
  }

  equalGrades(first: Grade[], second: Grade[]): boolean {
    if (first.length != second.length) {
      return false
    }
    for (let _i = 0; _i < first.length; _i++) {
      if (first[_i].grade != second[_i].grade) {
        return false
      }
      if (!this.equalGrades(first[_i].grades, second[_i].grades)) {
        return false
      }
    }
    return true
  }

  create(): void {
    this.originalThesis = this.deepCopyThesis(this.thesis)
    this.calcGrade()
    this.thesis.grading = this.deepCopyGrading(this.grading)
    this.thesisService.create(this.thesis)
    this.mode = Mode.NORMAL
    this.refresh()
  }

  refresh() {
    window.location.reload()
  }

  addColumn(): void {
    let note = new Note()
    note.content = ""
    note.createdUtc = new Date()
    this.thesis.notes.push(note)
    this.datasource = new MatTableDataSource(this.thesis.notes)
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.thesis.notes.findIndex(d => d === item)
      this.thesis.notes.splice(index, 1)
      this.datasource = new MatTableDataSource<Note>(this.thesis.notes)
    })
    this.selection = new SelectionModel<Note>(true, [])
  }


  evaluationSchemeColumnsScheme = ["name", "description", "createdUtc", "lastUpdatedUtc"]
  evaluationSchemeData: Observable<EvaluationSchemePreview[]>

  selectedEvaluationScheme = null

  showDate(evalSchemeId): string {
    const date = new Date(parseInt(evalSchemeId.substring(0, 8), 16) * 1000)
    return date.toLocaleString()
  }

  calcDate(lastUpdated: Date): string {
    return (new Date(new Date(lastUpdated.toString()).getTime())).toLocaleString()
  }

  normalizeDate(date: Date): Date {
    return new Date(date)
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

  treeControl = new NestedTreeControl<Grade>(node => node.grades)
  dataSource = new MatTreeNestedDataSource<Grade>()
  hasChild = (_: number, node: Grade) => !!node.grades && node.grades.length > 0

  openEvalSchemeDetail(id) {
    this.evaluationSchemeService.get(id).then(result => {
      this.selectedEvaluationScheme = result
      this.copyEvalSchemeToGrading(this.selectedEvaluationScheme)
      this.setAllCounters(this.grading.grades)
      this.dataSource.data = this.grading.grades
    })
  }

  setAllCounters(grades: Grade[], parent: Grade = null, preCounter: string = "") {
    if (grades == null || grades.length == 0) {
      return
    }
    grades.forEach((grade, index) => {
      grade.counter = preCounter + (index + 1).toString() + "."
      this.gradeGroup.addControl("grade" + grade.counter,
        new FormControl(null, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)))
      this.setAllCounters(grade.grades, grade, grade.counter)
    })
  }

  copyEvalSchemeToGrading(evaluationScheme) {
    this.grading = new Grading
    this.grading.name = evaluationScheme.name
    this.grading.description = evaluationScheme.description
    this.grading.grades = []
    this.copyCriteria(evaluationScheme.criteria, this.grading.grades)
  }

  copyCriteria(criteria, grades) {
    if (criteria == null || criteria.length == 0) {
      return
    }
    criteria.forEach((criterion, index) => {
      grades.push({
        name: criterion.name, weight: criterion.weight, description: criterion.description, grades: []
      })
      this.copyCriteria(criterion.criteria, grades[index].grades)
    })
  }

  calcGrade() {
    if (this.gradeGroup.hasError("pattern")) {
      this.showGradeError()
    } else if (this.grading != null) {
      this.clearAllGrades(this.grading.grades)
      this.thesis.calculatedGrade = this.calcSubgrades(this.grading.grades)
    }
  }

  clearAllGrades(grades) {
    if (grades == null || grades.length == 0) {
      return
    }
    for (let grade of grades) {
      if (grade.grades == null || grade.grades.length == 0) {
        return
      }
      grade.grade = null
      this.clearAllGrades(grade.grades)
    }
  }

  calcSubgrades(grades): number {
    if (grades == null || grades.length == 0) {
      return null
    }
    let subgrade: number = 0
    for (let grade of grades) {
      if (grade.grade == null || grade.grade == "") {
        grade.grade = this.calcSubgrades(grade.grades)
      }
      if (grade.grade == null || grade.grade == "") {
        return null
      }
      subgrade = (Math.round((grade.weight * grade.grade + subgrade) * 10000000000) / 10000000000)
    }
    if (subgrade == 0) {
      return null
    }
    return subgrade
  }

  deepCopyThesis(thesis: Thesis): Thesis {
    const copy = new Thesis()
    copy.id = thesis.id
    copy.firstName = thesis.firstName
    copy.lastName = thesis.lastName
    copy.gender = thesis.gender
    copy.email = thesis.email
    copy.studentId = thesis.studentId
    copy.supervisorId = thesis.supervisorId
    copy.supervisorFirstName = thesis.supervisorFirstName
    copy.supervisorLastName = thesis.supervisorLastName
    copy.evaluatorFirstName = thesis.evaluatorFirstName
    copy.evaluatorLastName = thesis.evaluatorLastName
    copy.thesisType = thesis.thesisType
    copy.departmentId = thesis.departmentId
    copy.departmentName = thesis.departmentName
    copy.subject = thesis.subject
    copy.title = thesis.title
    copy.status = this.deepCopyStatus(thesis.status)
    copy.notes = []
    if (thesis.notes != null) {
      for (let note of thesis.notes) {
        const newNote = new Note
        newNote.creatorId = note.creatorId
        newNote.createdUtc = note.createdUtc
        newNote.content = note.content
        copy.notes.push(newNote)
      }
    }
    copy.grade = thesis.grade
    copy.calculatedGrade = thesis.calculatedGrade
    copy.grading = this.deepCopyGrading(thesis.grading)
    return copy
  }

  deepCopyStatus(status): Status {
    const newStatus = new Status
    newStatus.allocationDateUtc = status.allocationDateUtc
    newStatus.signUpUtc = status.signUpUtc
    newStatus.presentationUtc = status.presentationUtc
    newStatus.presented = status.presented
    newStatus.dueDateUtc = status.dueDateUtc
    newStatus.extendedDueDateUtc = status.extendedDueDateUtc
    newStatus.submittedUtc = status.submittedUtc
    newStatus.gradedUtc = status.gradedUtc
    newStatus.reportCreatedUtc = status.reportCreatedUtc
    return newStatus
  }

  deepCopyGrading(grading: Grading): Grading {
    if (grading == null) {
      return null
    }
    const copy = new Grading
    copy.name = grading.name
    copy.description = grading.description
    copy.grades = this.copyGrades(grading.grades)
    return copy
  }

  copyGrades(grades: Grade[]): Grade[] {
    if (grades == null || grades.length == 0) {
      return []
    }
    const copy: Grade[] = []
    for (let grade of grades) {
      const newGrade = new Grade
      newGrade.counter = grade.counter
      newGrade.name = grade.name
      newGrade.description = grade.description
      newGrade.weight = grade.weight
      newGrade.grade = grade.grade
      newGrade.grades = this.copyGrades(grade.grades)
      copy.push(newGrade)
    }
    return copy
  }
}

export enum Mode {
  EDIT,
  NEW,
  NORMAL,
}

export enum Gender {
  FEMALE = "Weiblich",
  MALE = "Männlich",
  OTHER = "Divers"
}
