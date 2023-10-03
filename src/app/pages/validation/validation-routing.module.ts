import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationPage } from './validation.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationPage,
    children: [
      {
        path: 'validation-view-modal',
        loadChildren: () => import('../modals/validation-view-modal/validation-view-modal.module').then(m => m.ValidationViewModalPageModule)
      },
      {
        path: 'validation',
        redirectTo: 'validation-view-modal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'validation',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationPageRoutingModule {}
