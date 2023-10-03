import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatrolHistoryPage } from './patrol-history.page';

const routes: Routes = [
  {
    path: '',
    component: PatrolHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatrolHistoryPageRoutingModule {}
