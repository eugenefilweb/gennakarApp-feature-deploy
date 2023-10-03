import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCategoryFaunaPage } from './form-category-fauna.page';

const routes: Routes = [
  {
    path: '',
    component: FormCategoryFaunaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCategoryFaunaPageRoutingModule {}
