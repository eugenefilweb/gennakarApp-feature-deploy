import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapTabsPage } from './map-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MapTabsPage,
  },
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapTabsPageRoutingModule {}
