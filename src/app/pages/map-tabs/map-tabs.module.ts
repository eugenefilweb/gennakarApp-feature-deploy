import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapTabsPageRoutingModule } from './map-tabs-routing.module';

import { MapTabsPage } from './map-tabs.page';
import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapTabsPageRoutingModule,
    HeaderNavModule
  ],
  declarations: [MapTabsPage]
})
export class MapTabsPageModule {}
