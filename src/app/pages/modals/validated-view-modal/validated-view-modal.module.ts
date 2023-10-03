import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidatedViewModalPageRoutingModule } from './validated-view-modal-routing.module';

import { ValidatedViewModalPage } from './validated-view-modal.page';
import { SwiperModule } from 'swiper/angular';
import { FloraImagesViewModule } from 'src/app/components/flora-images-view/flora-images-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    FloraImagesViewModule,
    ValidatedViewModalPageRoutingModule
  ],
  declarations: [ValidatedViewModalPage]
})
export class ValidatedViewModalPageModule {}
