import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentalIncidentCategoryPage } from './environmental-incident-category.page';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentalIncidentCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentalIncidentCategoryPageRoutingModule {}
