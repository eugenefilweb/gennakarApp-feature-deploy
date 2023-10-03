import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloraValidationPageRoutingModule } from './flora-validation-routing.module';

import { FloraValidationPage } from './flora-validation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloraValidationPageRoutingModule
  ],
  declarations: [FloraValidationPage]
})
export class FloraValidationPageModule {}
