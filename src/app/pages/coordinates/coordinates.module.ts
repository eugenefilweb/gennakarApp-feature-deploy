import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoordinatesPageRoutingModule } from './coordinates-routing.module';

import { CoordinatesPage } from './coordinates.page';
import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoordinatesPageRoutingModule,
    HeaderNavModule
  ],
  declarations: [CoordinatesPage]
})
export class CoordinatesPageModule {}
