import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaunaDetailsPage } from './fauna-details.page';

const routes: Routes = [
  {
    path: '',
    component: FaunaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaunaDetailsPageRoutingModule {}
