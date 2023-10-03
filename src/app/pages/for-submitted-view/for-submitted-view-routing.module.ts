import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForSubmittedViewPage } from './for-submitted-view.page';

const routes: Routes = [
  {
    path: '',
    component: ForSubmittedViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForSubmittedViewPageRoutingModule {}
