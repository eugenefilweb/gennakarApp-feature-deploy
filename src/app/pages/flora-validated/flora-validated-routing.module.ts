import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloraValidatedPage } from './flora-validated.page';

const routes: Routes = [
  {
    path: '',
    component: FloraValidatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloraValidatedPageRoutingModule {}
