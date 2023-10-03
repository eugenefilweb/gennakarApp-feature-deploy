import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaunaValidatedPage } from './fauna-validated.page';

const routes: Routes = [
  {
    path: '',
    component: FaunaValidatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaunaValidatedPageRoutingModule {}
