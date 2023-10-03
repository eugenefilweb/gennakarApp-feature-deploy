import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaunaPage } from './fauna.page';

const routes: Routes = [
  {
    path: '',
    component: FaunaPage,
    children: [
      {
        path: 'fauna-for-submitted',
        loadChildren: () => import('../fauna-for-submitted/fauna-for-submitted.module')
        .then(m => m.FaunaForSubmittedPageModule),
      },
      {
        path: 'fauna-validation',
        loadChildren: () => import('../fauna-validation/fauna-validation.module')
        .then(m => m.FaunaValidationPageModule)
      },
      {
        path: 'fauna-validated',
        loadChildren: () => import('../fauna-validated/fauna-validated.module')
        .then(m => m.FaunaValidatedPageModule)
      },
      {
        path: '',
        redirectTo: 'fauna-for-submitted',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'fauna/fauna-for-submitted',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaunaPageRoutingModule {}
