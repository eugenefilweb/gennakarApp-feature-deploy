import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentalIncidentReportPage } from './environmental-incident-report.page';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentalIncidentReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentalIncidentReportPageRoutingModule {}
