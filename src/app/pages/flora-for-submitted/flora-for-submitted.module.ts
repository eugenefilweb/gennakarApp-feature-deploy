import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloraForSubmittedPageRoutingModule } from './flora-for-submitted-routing.module';

import { FloraForSubmittedPage } from './flora-for-submitted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloraForSubmittedPageRoutingModule
  ],
  declarations: [FloraForSubmittedPage]
})
export class FloraForSubmittedPageModule {}
