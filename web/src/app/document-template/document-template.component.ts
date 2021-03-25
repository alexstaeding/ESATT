/*
 *   ESATT - https://www.github.com/alexstaeding/ESATT
 *   Copyright (C) 2021 Bachelor-Praktikum Gruppe 20
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Lesser General Public License for more details.
 *
 *     You should have received a copy of the GNU Lesser General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {Component, OnInit} from "@angular/core"
import {DataToSend, DocumentTemplate, DocumentTemplateService} from "../service/document-template.service"
import {DocumentTemplateDetailComponent} from "./document-template-detail/document-template-detail.component"
import {DocumentTemplateThesisComponent} from "./document-template-thesis/document-template-thesis.component"
import {Grade, Thesis, ThesisService} from "../service/thesis.service"
import {MatDialog} from "@angular/material/dialog"
import {MatSnackBar} from "@angular/material/snack-bar"
import {TranslateService} from "@ngx-translate/core"
import Timeout = NodeJS.Timeout

@Component({
  selector: "app-document-template",
  templateUrl: "./document-template.component.html",
  styleUrls: ["./document-template.component.scss"]
})
export class DocumentTemplateComponent implements OnInit {
  documentTemplates: DocumentTemplate[]
  originalTemplate: DocumentTemplate = new DocumentTemplate()
  currentTemplate: DocumentTemplate = new DocumentTemplate()
  dataToSend: DataToSend
  placeHolderMap: any
  theses: Thesis[]
  currentThesis: Thesis
  downloadDisabled = false
  downloadDisabledTimer: Timeout

  constructor(
    private documentTemplateService: DocumentTemplateService,
    private thesesService: ThesisService,
    private templateDetailDialog: MatDialog,
    private thesisDetailDialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.initData()
  }

  public async initData() {
    await this.documentTemplateService.getAll().then(result => {
      if (result != null) {
        this.documentTemplates = result
      }
    })
    await this.thesesService.getAll().then(result => {
      if (result == null) {
        return
      }
      const currentTheses = []
      for (const thesis of result) {
        if (thesis.status == null || thesis.status.reportCreatedUtc == null) {
          currentTheses.push(thesis)
        }
      }
      this.theses = currentTheses
    })
  }

  async openTemplateDetailDialog(id: string = null) {
    this.templateDetailDialog.open(DocumentTemplateDetailComponent, {
      width: "100%",
      data: {id, component: this}
    })
  }

  loadTemplate(id: string = null) {
    const tmpTemplate = this.documentTemplates.find(s => s.id === id)
    this.placeHolderMap = {}
    if (tmpTemplate != null && tmpTemplate.placeholders != null) {
      for (const placeholder of tmpTemplate.placeholders) {
        this.placeHolderMap[placeholder] = ""
      }
      if (this.currentThesis != null && this.currentThesis.grading != null) {
        this.placeHolderMap.calculatedGrade = this.currentThesis.calculatedGrade == null
          ? "" : this.currentThesis.calculatedGrade.toString()
        this.placeHolderMap.overwrittenGrade = this.currentThesis.grade == null
          ? "" : this.currentThesis.grade.toString()
        this.setAllCounters(this.currentThesis.grading.grades)
        this.setAllGradingPlaceholders(this.currentThesis.grading.grades)
      }
    }
    this.currentTemplate = tmpTemplate
  }

  createDataToSend() {
    this.dataToSend = new DataToSend()
    this.dataToSend.id = this.currentTemplate.id
    this.dataToSend.placeholders = this.placeHolderMap
  }

  async generateDocs() {
    this.downloadDisabled = true
    const self = this
    this.downloadDisabledTimer = setTimeout(() => {
      self.downloadDisabled = false
    }, 5000)
    this.snackBar.open(this.translate.instant("document-template.snackbar.download"), null, {
      duration: 5000,
      verticalPosition: "bottom"
    })
    this.createDataToSend()
    const generatedDocuments = await this.documentTemplateService.generatePdf(this.dataToSend)

    const pdfFileName = generatedDocuments.pdfFileName
    const texFileName = generatedDocuments.texFileName

    const pdfUrl = "/generated-documents/" + pdfFileName
    const texUrl = "/generated-documents/" + texFileName
    const link = document.createElement("a")

    link.href = pdfUrl
    link.download = "GeneratedPdf.pdf"
    link.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}))
    setTimeout(() => {
      window.URL.revokeObjectURL(pdfUrl)
      link.remove()
    }, 100)

    link.href = texUrl
    link.download = "GeneratedLatex.tex"
    link.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}))
    setTimeout(() => {
      window.URL.revokeObjectURL(texUrl)
      link.remove()
    }, 100)
    clearTimeout(this.downloadDisabledTimer)
    this.downloadDisabled = false
  }

  openThesisDetail(thesis: Thesis) {
    this.thesisDetailDialog.open(DocumentTemplateThesisComponent, {
      width: "100%",
      data: {thesis, component: this}
    })
  }

  setAllCounters(grades: Grade[], parent: Grade = null, preCounter: string = "") {
    if (grades == null || grades.length === 0) {
      return
    }
    grades.forEach((grade, index) => {
      grade.counter = preCounter + (index + 1).toString() + "."
      this.setAllCounters(grade.grades, grade, grade.counter)
    })
  }

  setAllGradingPlaceholders(grades: Grade[]) {
    if (grades == null || grades.length === 0) {
      return
    }
    for (const grade of grades) {
      this.placeHolderMap[grade.counter + "criterion"] = grade.name == null ? "" : grade.name
      this.placeHolderMap[grade.counter + "weight"] = grade.weight == null ? "" : grade.weight.toString()
      this.placeHolderMap[grade.counter + "grade"] = grade.grade == null ? "" : grade.grade.toString()
      this.placeHolderMap[grade.counter + "description"] = grade.description == null ? "" : grade.description
      this.setAllGradingPlaceholders(grade.grades)
    }
  }
}
