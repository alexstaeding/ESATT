import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentTemplateComponent} from "./document-template.component";
import {DocumentTemplateDetailComponent} from "./document-template-detail/document-template-detail.component"

const routes: Routes = [
  {
    path: '',
    component: DocumentTemplateComponent
  },
  {
    path: ":id",
    component: DocumentTemplateDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTemplateRoutingModule { }
