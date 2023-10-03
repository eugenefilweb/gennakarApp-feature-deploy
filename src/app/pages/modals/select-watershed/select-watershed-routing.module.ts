import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectWatershedPage } from './select-watershed.page';

const routes: Routes = [
  {
    path: '',
    component: SelectWatershedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectWatershedPageRoutingModule {}
