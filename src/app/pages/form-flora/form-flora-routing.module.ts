import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormFloraPage } from './form-flora.page';

const routes: Routes = [
  {
    path: '',
    component: FormFloraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormFloraPageRoutingModule {}
