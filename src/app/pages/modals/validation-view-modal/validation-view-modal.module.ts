import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidationViewModalPageRoutingModule } from './validation-view-modal-routing.module';

import { ValidationViewModalPage } from './validation-view-modal.page';
import { SwiperModule } from 'swiper/angular';
import { FloraImagesViewModule } from 'src/app/components/flora-images-view/flora-images-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    ValidationViewModalPageRoutingModule,
    FloraImagesViewModule
  ],
  declarations: [ValidationViewModalPage]
})
export class ValidationViewModalPageModule {}
