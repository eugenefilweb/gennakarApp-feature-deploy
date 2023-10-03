import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaunaForSubmittedViewPage } from './fauna-for-submitted-view.page';

const routes: Routes = [
  {
    path: '',
    component: FaunaForSubmittedViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaunaForSubmittedViewPageRoutingModule {}
