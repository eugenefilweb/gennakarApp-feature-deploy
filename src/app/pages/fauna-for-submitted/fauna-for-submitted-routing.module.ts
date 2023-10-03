import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaunaForSubmittedPage } from './fauna-for-submitted.page';

const routes: Routes = [
  {
    path: '',
    component: FaunaForSubmittedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaunaForSubmittedPageRoutingModule {}
