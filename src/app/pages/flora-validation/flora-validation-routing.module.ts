import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloraValidationPage } from './flora-validation.page';

const routes: Routes = [
  {
    path: '',
    component: FloraValidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloraValidationPageRoutingModule {}
