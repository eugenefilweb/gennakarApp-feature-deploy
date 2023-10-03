import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from '../guards/home.guard';
import { UserDataResolver } from '../resolvers/user-data.resolver';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        canActivate: [HomeGuard],
        resolve: {userData: UserDataResolver},
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
            },
            {
                path: 'flora',
                loadChildren: () => import('../pages/flora/flora.module').then(m => m.FloraPageModule)
            },
            {
                path: 'fauna',
                loadChildren: () => import('../pages/fauna/fauna.module').then(m => m.FaunaPageModule)
            },
            {
                path: 'library',
                loadChildren: () => import('../pages/library/library.module').then(m => m.LibraryPageModule)
            },
            {
                path: 'patrol-history',                
                loadChildren: () => import('../pages/patrol-history/patrol-history.module').then(m => m.PatrolHistoryPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
            },
            {
                path: 'coordinates',
                loadChildren: () => import('../pages/coordinates/coordinates.module').then(m => m.CoordinatesPageModule)
            },
			{
				path: 'environtmental-incident-report',
				loadChildren: () => import('../pages/environmental-incident-report/environmental-incident-report.module').then(m => m.EnvironmentalIncidentReportPageModule)
            },
            {
                path: 'mapbox',
                loadChildren: () => import('../pages/mapbox/mapbox.module').then( m => m.MapboxPageModule)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
