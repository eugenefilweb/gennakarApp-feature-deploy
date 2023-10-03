import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidatedPage } from './validated.page';

const routes: Routes = [
  {
    path: '',
    component: ValidatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidatedPageRoutingModule {}
