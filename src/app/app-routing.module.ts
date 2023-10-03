import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { IndexGuard } from './guards/index.guard';
const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [HomeGuard],
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    canActivate: [IndexGuard],
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'welcome',
    canActivate: [IndexGuard],
    loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'map',
    canActivate: [HomeGuard],
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },  {
    path: 'fauna-for-submitted-view',
    loadChildren: () => import('./pages/fauna-for-submitted-view/fauna-for-submitted-view.module').then( m => m.FaunaForSubmittedViewPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
