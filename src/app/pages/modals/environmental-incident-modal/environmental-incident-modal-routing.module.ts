import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentalIncidentModalPage } from './environmental-incident-modal.page';

const routes: Routes = [
  { path: '', component: EnvironmentalIncidentModalPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentalIncidentModalPageRoutingModule {}
