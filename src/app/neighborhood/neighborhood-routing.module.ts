import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeighborhoodPage } from './neighborhood.page';

const routes: Routes = [
  {
    path: '',
    component: NeighborhoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeighborhoodPageRoutingModule {}
