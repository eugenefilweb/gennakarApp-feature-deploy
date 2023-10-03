import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppTabsPageRoutingModule } from './app-tabs-routing.module';

import { AppTabsPage } from './app-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppTabsPageRoutingModule
  ],
  declarations: [AppTabsPage]
})
export class AppTabsPageModule {}
