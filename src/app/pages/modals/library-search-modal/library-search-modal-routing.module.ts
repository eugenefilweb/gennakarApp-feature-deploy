import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrarySearchModalPage } from './library-search-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LibrarySearchModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrarySearchModalPageRoutingModule {}
