import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryPage } from './library.page';

const routes: Routes = [
    {
        path: '',
        component: LibraryPage,
        children: [
            {
                path: 'library-view',
                loadChildren: () => import('./../library-view/library-view.module').then( m => m.LibraryViewPageModule)
            },
            {
                path: 'library-search',
                loadChildren: () => import('./../library-search/library-search.module').then( m => m.LibrarySearchPageModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LibraryPageRoutingModule {}
