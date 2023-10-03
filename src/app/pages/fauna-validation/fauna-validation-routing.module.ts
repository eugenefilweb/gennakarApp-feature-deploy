import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaunaValidationPage } from './fauna-validation.page';

const routes: Routes = [
  {
    path: '',
    component: FaunaValidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaunaValidationPageRoutingModule {}
