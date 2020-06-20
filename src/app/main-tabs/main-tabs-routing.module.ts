import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainTabsPage } from './main-tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MainTabsPage,
    children: [
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'neighborhood',
        loadChildren: () =>
          import('../neighborhood/neighborhood.module').then(
            (m) => m.NeighborhoodPageModule
          ),
      },
      {
        path: 'activity',
        loadChildren: () =>
          import('../activity/activity.module').then(
            (m) => m.ActivityPageModule
          ),
      },
      {
        path: 'my-profile',
        loadChildren: () =>
          import('../my-profile/my-profile.module').then(
            (m) => m.MyProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/main/tabs/search',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainTabsPageRoutingModule {}
