import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaunaDetailsPageRoutingModule } from './fauna-details-routing.module';

import { FaunaDetailsPage } from './fauna-details.page';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaunaDetailsPageRoutingModule,
    MenuButtonModule
  ],
  declarations: [FaunaDetailsPage]
})
export class FaunaDetailsPageModule {}
