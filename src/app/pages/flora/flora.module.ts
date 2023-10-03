import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloraPageRoutingModule } from './flora-routing.module';
import { FormFloraPageModule } from '../form-flora/form-flora.module'; //add child module for MODAL Controller
import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';

import { FloraPage } from './flora.page';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloraPageRoutingModule,
    FormFloraPageModule,
    HeaderNavModule,
    MenuButtonModule
  ],
  declarations: [FloraPage]
})
export class FloraPageModule {}
