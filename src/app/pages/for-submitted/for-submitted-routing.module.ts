import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForSubmittedPage } from './for-submitted.page';

const routes: Routes = [
  {
    path: '',
    component: ForSubmittedPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForSubmittedPageRoutingModule {}
