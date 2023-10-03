import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloraForSubmittedPage } from './flora-for-submitted.page';

const routes: Routes = [
  {
    path: '',
    component: FloraForSubmittedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloraForSubmittedPageRoutingModule {}
