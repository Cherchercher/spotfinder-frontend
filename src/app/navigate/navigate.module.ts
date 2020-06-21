import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NavigatePageRoutingModule } from "./navigate-routing.module";

import { NavigatePage } from "./navigate.page";
import { ModalFilterPage } from "../modal-filter/modal-filter.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NavigatePageRoutingModule],
  declarations: [NavigatePage, ModalFilterPage],
  entryComponents: [ModalFilterPage],
})
export class NavigatePageModule {}
