import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCaptureFloraPageRoutingModule } from './form-capture-flora-routing.module';

import { FormCaptureFloraPage } from './form-capture-flora.page';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';
import { DismissButtonModule } from 'src/app/components/dismiss-button/dismiss-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCaptureFloraPageRoutingModule,
    MenuButtonModule,
    DismissButtonModule
  ],
  declarations: [FormCaptureFloraPage]
})
export class FormCaptureFloraPageModule {}
