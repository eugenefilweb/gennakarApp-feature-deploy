import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCaptureFaunaPage } from './form-capture-fauna.page';

const routes: Routes = [
  {
    path: '',
    component: FormCaptureFaunaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCaptureFaunaPageRoutingModule {}
