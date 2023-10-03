import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaunaValidatedPageRoutingModule } from './fauna-validated-routing.module';

import { FaunaValidatedPage } from './fauna-validated.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaunaValidatedPageRoutingModule
  ],
  declarations: [FaunaValidatedPage]
})
export class FaunaValidatedPageModule {}
