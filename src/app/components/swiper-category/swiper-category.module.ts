import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperCategoryComponent } from './swiper-category.component';

@NgModule({
  declarations: [SwiperCategoryComponent],
  imports: [CommonModule],
  exports: [SwiperCategoryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperCategoryModule {}
