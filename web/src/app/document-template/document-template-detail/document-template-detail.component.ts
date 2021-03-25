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

import {Component, Inject, OnInit} from "@angular/core"
import {MatSnackBar} from "@angular/material/snack-bar"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {TranslateService} from "@ngx-translate/core"
import {DocumentTemplate, DocumentTemplateService} from "../../service/document-template.service"

@Component({
  selector: "app-evaluation-scheme-detail",
  templateUrl: "./document-template-detail.component.html",
  styleUrls: ["./document-template-detail.component.scss"]
})
export class DocumentTemplateDetailComponent implements OnInit {
  originalTemplate: DocumentTemplate
  currentTemplate: DocumentTemplate = new DocumentTemplate()
  modeRef = Mode
  mode: Mode

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData,
    private documentTemplateService: DocumentTemplateService,
    private dialogRef: MatDialogRef<DocumentTemplateDetailComponent>,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    if (this.passedData.id == null) {
      this.currentTemplate = {
        id: null, lastUpdatedUtc: null, name: "", texTemplate: "", placeholders: []
      }
      this.mode = Mode.NEW
    } else {
      this.documentTemplateService.get(this.passedData.id).then(result => {
        if (result == null) {
          return
        }
        this.originalTemplate = result
        this.currentTemplate = this.deepCopy(this.originalTemplate)
        this.mode = Mode.EDIT
      })
    }
  }

  deepCopy(template: DocumentTemplate): DocumentTemplate {
    const copy = new DocumentTemplate()
    copy.id = template.id
    copy.name = template.name
    copy.texTemplate = template.texTemplate
    copy.placeholders = []

    if (template.placeholders == null) {
      return copy
    }

    for (let placeholder of template.placeholders) {
      copy.placeholders.push(placeholder)
    }
    return copy
  }

  async addDocumentTemplate() {
    if (this.currentTemplate.name == null
      || this.currentTemplate.texTemplate == null
      || this.currentTemplate.name.trim() == ""
      || this.currentTemplate.texTemplate.trim() == "") {
      this.snackBar.open(this.translate.instant("document-template.snackbar.not-added"), null, {
        duration: 2000,
        verticalPosition: "bottom",
        panelClass: ["red-snackbar"]
      })
      return
    }
    const documentTemplate = new DocumentTemplate()
    documentTemplate.name = this.currentTemplate.name
    documentTemplate.texTemplate = this.currentTemplate.texTemplate
    await this.documentTemplateService.create(documentTemplate)
    this.snackBar.open(this.currentTemplate.name + " " + this.translate.instant("document-template.snackbar.created"), null, {
      duration: 2000,
      verticalPosition: "bottom"
    })
    this.dialogRef.close()
    await this.passedData.component.initData()
  }

  async saveChanges() {
    if (this.currentTemplate.name == null
      || this.currentTemplate.name.trim() == ""
      || this.currentTemplate.texTemplate == null
      || this.currentTemplate.texTemplate.trim() == "") {
      this.snackBar.open(this.translate.instant("document-template.snackbar.not-added"), null, {
        duration: 2000,
        verticalPosition: "bottom",
        panelClass: ["red-snackbar"]
      })
      return
    }
    await this.documentTemplateService.update(this.currentTemplate)
    this.snackBar.open(this.currentTemplate.name + " " + this.translate.instant("document-template.snackbar.changed"), null, {
      duration: 2000,
      verticalPosition: "bottom"
    })
    this.dialogRef.close()
    await this.passedData.component.initData()
    await this.passedData.component.loadTemplate(this.currentTemplate.id)
  }
}

export enum Mode {
  EDIT,
  NEW,
}
