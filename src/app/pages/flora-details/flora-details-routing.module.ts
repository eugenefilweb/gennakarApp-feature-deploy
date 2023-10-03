import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloraDetailsPage } from './flora-details.page';

const routes: Routes = [
  {
    path: '',
    component: FloraDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloraDetailsPageRoutingModule {}
