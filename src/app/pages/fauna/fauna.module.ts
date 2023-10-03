import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaunaPageRoutingModule } from './fauna-routing.module';

import { FaunaPage } from './fauna.page';
import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaunaPageRoutingModule,
    MenuButtonModule
  ],
  declarations: [FaunaPage]
})
export class FaunaPageModule {}
