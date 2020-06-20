import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeighborhoodPageRoutingModule } from './neighborhood-routing.module';

import { NeighborhoodPage } from './neighborhood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeighborhoodPageRoutingModule
  ],
  declarations: [NeighborhoodPage]
})
export class NeighborhoodPageModule {}
