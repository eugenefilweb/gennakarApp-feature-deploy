import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidatedViewModalPage } from './validated-view-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ValidatedViewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidatedViewModalPageRoutingModule {}
