import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./activity/activity.module').then((m) => m.ActivityPageModule),
  },
  {
    path: 'find-friend',
    loadChildren: () =>
      import('./find-friend/find-friend.module').then(
        (m) => m.FindFriendPageModule
      ),
  },
  {
    path: 'neighborhood',
    loadChildren: () =>
      import('./neighborhood/neighborhood.module').then((m) => m.NeighborhoodPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main-tabs/main-tabs.module').then((m) => m.MainTabsPageModule),
  },
  {
    path: 'my-profile',
    loadChildren: () =>
      import('./my-profile/my-profile.module').then(
        (m) => m.MyProfilePageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },

  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./setting/setting.module').then((m) => m.SettingPageModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
