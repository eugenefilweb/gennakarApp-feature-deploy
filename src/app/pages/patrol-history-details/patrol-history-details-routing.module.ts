import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatrolHistoryDetailsPage } from './patrol-history-details.page';

const routes: Routes = [
  {
    path: '',
    component: PatrolHistoryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatrolHistoryDetailsPageRoutingModule {}
