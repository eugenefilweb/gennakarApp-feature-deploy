import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppTabsPage } from './app-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AppTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppTabsPageRoutingModule {}
