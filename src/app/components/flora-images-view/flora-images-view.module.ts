import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloraImagesViewComponent } from './flora-images-view.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [FloraImagesViewComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [FloraImagesViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FloraImagesViewModule { }
