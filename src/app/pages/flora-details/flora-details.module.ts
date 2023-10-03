import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloraDetailsPageRoutingModule } from './flora-details-routing.module';

import { FloraDetailsPage } from './flora-details.page';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';
import { DismissButtonModule } from 'src/app/components/dismiss-button/dismiss-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloraDetailsPageRoutingModule,
    MenuButtonModule,
    DismissButtonModule
  ],
  declarations: [FloraDetailsPage]
})
export class FloraDetailsPageModule {}
