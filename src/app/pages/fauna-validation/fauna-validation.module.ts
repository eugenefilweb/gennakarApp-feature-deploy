import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaunaValidationPageRoutingModule } from './fauna-validation-routing.module';

import { FaunaValidationPage } from './fauna-validation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaunaValidationPageRoutingModule
  ],
  declarations: [FaunaValidationPage]
})
export class FaunaValidationPageModule {}
