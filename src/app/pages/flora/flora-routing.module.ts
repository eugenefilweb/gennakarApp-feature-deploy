import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloraPage } from './flora.page';

const routes: Routes = [
    {
        path: '',
        component: FloraPage,
        children:[
            {
                path: 'for-submitted',
                loadChildren: () => import('../for-submitted/for-submitted.module').then(m => m.ForSubmittedPageModule),
            },
            {
                path: 'validation',
                loadChildren: () => import('../validation/validation.module')
                .then(m => m.ValidationPageModule)
            },
            {
                path: 'validated',
                loadChildren: () => import('../validated/validated.module')
                .then(m => m.ValidatedPageModule)
            },
            {
                path: '',
                redirectTo: 'for-submitted',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '',
        redirectTo: 'flora/for-submitted',
        pathMatch: 'full'
    },
    // {
    //     path:'form-flora',
    //     children :[
    //         {
    //             path: '',
    //             loadChildren: () => import('../form-flora/form-flora.mghodule')
    //             .then( m => m.FormFloraPageModule)
    //         }
    //     ]
    // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloraPageRoutingModule {}
