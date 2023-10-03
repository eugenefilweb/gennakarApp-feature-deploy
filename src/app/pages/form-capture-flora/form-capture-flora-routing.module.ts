import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCaptureFloraPage } from './form-capture-flora.page';

const routes: Routes = [
  {
    path: '',
    component: FormCaptureFloraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCaptureFloraPageRoutingModule {}
