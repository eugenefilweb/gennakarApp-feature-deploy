import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectWatershedPageRoutingModule } from './select-watershed-routing.module';

import { SelectWatershedPage } from './select-watershed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectWatershedPageRoutingModule
  ],
  declarations: [SelectWatershedPage]
})
export class SelectWatershedPageModule {}
