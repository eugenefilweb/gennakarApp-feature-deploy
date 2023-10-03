import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloraValidatedPageRoutingModule } from './flora-validated-routing.module';

import { FloraValidatedPage } from './flora-validated.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloraValidatedPageRoutingModule
  ],
  declarations: [FloraValidatedPage]
})
export class FloraValidatedPageModule {}
