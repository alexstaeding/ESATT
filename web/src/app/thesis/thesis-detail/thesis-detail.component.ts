import {Component, Inject, OnInit, TemplateRef, ViewChild} from "@angular/core"
import {Department, DepartmentService} from "../../service/department.service"
import {EvaluationScheme, EvaluationSchemeService} from "../../service/evaluation-scheme.service"
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {Grade, Grading, Note, Status, Thesis, ThesisService} from "../../service/thesis.service"
import {MatSnackBar} from "@angular/material/snack-bar"
import {MatTableDataSource} from "@angular/material/table"
import {MatTreeNestedDataSource} from "@angular/material/tree"
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog"
import {NestedTreeControl} from "@angular/cdk/tree"
import {SelectionModel} from "@angular/cdk/collections"
import {TranslateService} from "@ngx-translate/core"
import {User, UserService} from "../../service/user.service"


@Component({
  selector: "app-thesis-detail",
  templateUrl: "./thesis-detail.component.html",
  styleUrls: ["./thesis-detail.component.scss"],
})
export class ThesisDetailComponent implements OnInit {

  genderType = Gender
  selectedTab = 0
  dialog: HTMLElement
  originalThesis: Thesis
  thesis: Thesis = new Thesis()
  thesisWithChanges: Thesis
  datasource: MatTableDataSource<Note>
  mode = Mode
  genders = Object.values(Gender)
  users: User[] = []
  departments: Department[] = []
  selection = new SelectionModel<Note>(true, [])
  currentMode: Mode = Mode.NORMAL
  currentDate: Date = new Date()
  grading: Grading = new Grading()
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  gradeGroup: FormGroup
  displayedColumns: string[] = ["checked", "Datum", "Notiz"]
  evaluationSchemeColumnsScheme: string[] = ["name", "description", "createdUtc", "lastUpdatedUtc"]
  evaluationSchemeData: MatTableDataSource<EvaluationScheme>
  selectedEvaluationScheme: EvaluationScheme = null
  treeControl = new NestedTreeControl<Grade>(node => node.grades)
  dataSource = new MatTreeNestedDataSource<Grade>()
  departmentName: string
  departmentId: number
  departmentDialogRef: MatDialogRef<any>
  gradeControl = new FormControl(null, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/))
  sorting = Sorting.NOT
  sortMode = Sorting
  currentField: string = null
  searchValue: string = ""
  @ViewChild("departmentDialog", {static: true}) departmentDialog: TemplateRef<any>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private thesisService: ThesisService,
    private evaluationSchemeService: EvaluationSchemeService,
    private userService: UserService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private departmentMatDialog: MatDialog,
  ) {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ["", Validators.required],
    })
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ["", Validators.required],
    })
    this.gradeGroup = formBuilder.group({})
  }

  ngOnInit() {
    this.userService.getAll().then(result => {
      this.users = result
    })
    this.departmentService.getAll().then(result => {
      this.departments = result
    })
    if (this.data.id == null) {
      this.thesis = new Thesis()
      this.thesis.status = new Status()
      this.thesis.notes = new Array<Note>()
      this.currentMode = Mode.NEW
      const data: Note[] = this.thesis.notes
      this.datasource = new MatTableDataSource<Note>(data)
      this.grading = null
    } else {
      this.thesis.status = new Status()
      this.thesisService.get(this.data.id).then(result => {
        this.originalThesis = this.deepCopyThesis(result)
        if (this.originalThesis.grading != null) {
          this.setAllCounters(this.originalThesis.grading.grades)
        }
        this.resetThesis()
      })
    }
    this.initData()
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
    const data: Note[] = this.thesis.notes
    this.datasource = new MatTableDataSource<Note>(data)
    this.currentMode = Mode.NORMAL
    if (this.currentMode === this.mode.NORMAL && this.thesis.grading == null) {
      this.selectedTab = 0
    }
  }

  changeToEdit() {
    this.originalThesis = this.deepCopyThesis(this.thesis)
    this.currentMode = Mode.EDIT
  }

  async save() {
    this.calcGrade()
    if (this.thesis.calculatedGrade != null && this.thesis.calculatedGrade.toString() === "NaN") {
      this.showGradeError()
    } else {
      this.thesis.grading = this.deepCopyGrading(this.grading)
      this.thesisWithChanges = new Thesis()
      this.thesisWithChanges.id = this.thesis.id
      if (this.thesis.firstName !== this.originalThesis.firstName) {
        this.thesisWithChanges.firstName = this.thesis.firstName
      }
      if (this.thesis.lastName !== this.originalThesis.lastName) {
        this.thesisWithChanges.lastName = this.thesis.lastName
      }
      if (this.thesis.gender !== this.originalThesis.gender) {
        this.thesisWithChanges.gender = this.thesis.gender
      }
      if (this.thesis.email !== this.originalThesis.email) {
        this.thesisWithChanges.email = this.thesis.email
      }
      if (this.thesis.studentId !== this.originalThesis.studentId) {
        this.thesisWithChanges.studentId = this.thesis.studentId
      }
      if (this.thesis.supervisorId !== this.originalThesis.supervisorId) {
        this.thesisWithChanges.supervisorId = this.thesis.supervisorId
      }
      if (this.thesis.supervisorFirstName !== this.originalThesis.supervisorFirstName) {
        this.thesisWithChanges.supervisorFirstName = this.thesis.supervisorFirstName
      }
      if (this.thesis.supervisorLastName !== this.originalThesis.supervisorLastName) {
        this.thesisWithChanges.supervisorLastName = this.thesis.supervisorLastName
      }
      if (this.thesis.evaluatorFirstName !== this.originalThesis.evaluatorFirstName) {
        this.thesisWithChanges.evaluatorFirstName = this.thesis.evaluatorFirstName
      }
      if (this.thesis.evaluatorLastName !== this.originalThesis.evaluatorLastName) {
        this.thesisWithChanges.evaluatorLastName = this.thesis.evaluatorLastName
      }
      if (this.thesis.thesisType !== this.originalThesis.thesisType) {
        this.thesisWithChanges.thesisType = this.thesis.thesisType
      }
      if (this.thesis.departmentId !== this.originalThesis.departmentId) {
        this.thesisWithChanges.departmentId = this.thesis.departmentId
      }
      if (this.thesis.departmentName !== this.originalThesis.departmentName) {
        this.thesisWithChanges.departmentName = this.thesis.departmentName
      }
      if (this.thesis.subject !== this.originalThesis.subject) {
        this.thesisWithChanges.subject = this.thesis.subject
      }
      if (this.thesis.title !== this.originalThesis.title) {
        this.thesisWithChanges.title = this.thesis.title
      }
      if (!this.equalStatus(this.thesis.status, this.originalThesis.status)) {
        this.thesisWithChanges.status = this.thesis.status
      }
      if (!this.equalNotes(this.thesis.notes, this.originalThesis.notes)) {
        this.thesisWithChanges.notes = this.thesis.notes
      }
      if (this.thesis.grade !== this.originalThesis.grade) {
        this.thesisWithChanges.grade = this.thesis.grade
        if (this.thesisWithChanges.grade.toString() === "") {
          this.thesisWithChanges.grade = 0.0
        }
        const numberValidator = new RegExp(/^[0-9]+(\.[0-9]+)?$/)
        if (!numberValidator.test(this.thesisWithChanges.grade.toString())) {
          this.showGradeError()
          return
        }
      }
      if (this.thesis.calculatedGrade !== this.originalThesis.calculatedGrade) {
        this.thesisWithChanges.calculatedGrade = this.thesis.calculatedGrade
      }
      if (!this.equalGrading(this.thesis.grading, this.originalThesis.grading)) {
        this.thesisWithChanges.grading = new Grading()
        this.thesisWithChanges.grading = this.deepCopyGrading(this.thesis.grading)
      }
      await this.thesisService.update(this.thesisWithChanges)
      this.currentMode = Mode.NORMAL
      await this.data.component.initData()
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
    return !(first.allocationDateUtc !== second.allocationDateUtc || first.signUpUtc !== second.signUpUtc ||
      first.presentationUtc !== second.presentationUtc || first.dueDateUtc !== second.dueDateUtc ||
      first.extendedDueDateUtc !== second.extendedDueDateUtc || first.submittedUtc !== second.submittedUtc ||
      first.gradedUtc !== second.gradedUtc || first.reportCreatedUtc !== second.reportCreatedUtc)
  }

  equalNotes(first: Note[], second: Note[]): boolean {
    if (first.length !== second.length) {
      return false
    }
    for (let i = 0; i < first.length; i++) {
      if (first[i].creatorId !== second[i].creatorId || first[i].createdUtc !== second[i].createdUtc
        || first[i].content !== second[i].content) {
        return false
      }
    }
    return true
  }

  equalGrading(first: Grading, second: Grading): boolean {
    if (first == null && second == null) {
      return true
    }
    if (first == null || second == null) {
      return false
    }
    return this.equalGrades(first.grades, second.grades)
  }

  equalGrades(first: Grade[], second: Grade[]): boolean {
    if (first.length !== second.length) {
      return false
    }
    for (let i = 0; i < first.length; i++) {
      if (first[i].grade !== second[i].grade) {
        return false
      }
      if (!this.equalGrades(first[i].grades, second[i].grades)) {
        return false
      }
    }
    return true
  }

  async create() {
    this.originalThesis = this.deepCopyThesis(this.thesis)
    this.calcGrade()
    this.thesis.grading = this.deepCopyGrading(this.grading)
    await this.thesisService.create(this.thesis)
    this.currentMode = Mode.NORMAL
    await this.data.component.initData()
  }

  addColumn() {
    const note = new Note()
    note.content = ""
    note.createdUtc = new Date()
    this.thesis.notes.push(note)
    this.datasource = new MatTableDataSource(this.thesis.notes)
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const index: number = this.thesis.notes.findIndex(d => d === item)
      this.thesis.notes.splice(index, 1)
      this.datasource = new MatTableDataSource<Note>(this.thesis.notes)
    })
    this.selection = new SelectionModel<Note>(true, [])
  }

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
      if (preview !== description) {
        preview = preview + " ..."
      }
      return preview
    }
    return description
  }

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
    if (grades == null || grades.length === 0) {
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
    this.grading = new Grading()
    this.grading.name = evaluationScheme.name
    this.grading.description = evaluationScheme.description
    this.grading.grades = []
    this.copyCriteria(evaluationScheme.criteria, this.grading.grades)
  }

  copyCriteria(criteria, grades) {
    if (criteria == null || criteria.length === 0) {
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
    if (this.grading != null) {
      this.clearAllGrades(this.grading.grades)
      this.thesis.calculatedGrade = this.calcSubgrades(this.grading.grades)
      if (this.thesis.calculatedGrade != null && this.thesis.calculatedGrade.toString() === "NaN") {
        this.showGradeError()
      }
    }
  }

  clearAllGrades(grades) {
    if (grades == null || grades.length === 0) {
      return
    }
    for (const grade of grades) {
      if (grade.grades == null || grade.grades.length === 0) {
        return
      }
      grade.grade = 0.0
      this.clearAllGrades(grade.grades)
    }
  }

  calcSubgrades(grades): number {
    if (grades == null || grades.length === 0) {
      return 0.0
    }
    let subgrade = 0
    for (const grade of grades) {
      if (grade.grade == null || grade.grade === 0 || grade.grade === "") {
        grade.grade = this.calcSubgrades(grade.grades)
      }
      if (grade.grade == null || grade.grade === 0 || grade.grade === "") {
        return 0.0
      }
      subgrade = (Math.round((grade.weight * grade.grade + subgrade) * 10000000000) / 10000000000)
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
      for (const note of thesis.notes) {
        const newNote = new Note()
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
    const newStatus = new Status()
    newStatus.allocationDateUtc = status.allocationDateUtc
    newStatus.signUpUtc = status.signUpUtc
    newStatus.presentationUtc = status.presentationUtc
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
    const copy = new Grading()
    copy.name = grading.name
    copy.description = grading.description
    copy.grades = this.copyGrades(grading.grades)
    return copy
  }

  copyGrades(grades: Grade[]): Grade[] {
    if (grades == null || grades.length === 0) {
      return []
    }
    const copy: Grade[] = []
    for (const grade of grades) {
      const newGrade = new Grade()
      newGrade.counter = grade.counter
      newGrade.name = grade.name
      newGrade.description = grade.description
      newGrade.weight = grade.weight
      newGrade.grade = grade.grade
      if (newGrade.grade == null || newGrade.grade.toString() === "") {
        newGrade.grade = 0.0
      }
      newGrade.grades = this.copyGrades(grade.grades)
      copy.push(newGrade)
    }
    return copy
  }

  openDepartmentDialog() {
    this.departmentDialogRef = this.departmentMatDialog.open(this.departmentDialog)
  }

  async addDepartment() {
    const department = new Department()
    department.name = this.departmentName
    department.id = this.departmentId
    department.lastUpdatedUtc = new Date()
    this.departments.push(department)
    await this.departmentService.create(department)
    this.departmentDialogRef.close()
  }

  public initData(
    ascending: boolean = null,
    field: string = null,
    limit: number = null,
    preview: boolean = null,
    search: string = null,
  ) {
    this.searchValue = search
    this.evaluationSchemeService.getAll(ascending, field, limit, preview, search).then(result => {
      this.evaluationSchemeData = new MatTableDataSource(result)
    })
  }

  sort(field: string) {
    if (this.currentField !== field) {
      this.sorting = Sorting.NOT
    }
    this.currentField = field
    if (this.sorting === Sorting.NOT) {
      this.sorting = Sorting.ASCENDING
      if (field === "createdUtc") {
        this.initData(true, null, null, true, this.searchValue)
        return
      }
      this.initData(true, field, null, true, this.searchValue)
    } else if (this.sorting === Sorting.ASCENDING) {
      this.sorting = Sorting.DESCENDING
      if (field === "createdUtc") {
        this.initData(false, null, null, true, this.searchValue)
        return
      }
      this.initData(false, field, null, true, this.searchValue)
    } else if (this.sorting === Sorting.DESCENDING) {
      this.sorting = Sorting.NOT
      this.initData(null, null, null, true, this.searchValue)
      this.currentField = null
    }
  }
}

export enum Mode {
  EDIT,
  NEW,
  NORMAL,
}

// values used by translate module
export enum Gender {
  FEMALE = "gender.female",
  MALE = "gender.male",
  OTHER = "gender.other",
}

export enum Sorting {
  NOT,
  DESCENDING,
  ASCENDING,
}
