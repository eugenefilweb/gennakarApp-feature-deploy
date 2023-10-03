import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCategoryFloraPage } from './form-category-flora.page';

const routes: Routes = [
  {
    path: '',
    component: FormCategoryFloraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCategoryFloraPageRoutingModule {}
