import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationViewModalPage } from './validation-view-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationViewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationViewModalPageRoutingModule {}
