import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ForSubmittedViewPageRoutingModule } from './for-submitted-view-routing.module';

import { ForSubmittedViewPage } from './for-submitted-view.page';
import { SwiperModule } from 'swiper/angular';
import { LibrarySearchModalPageModule } from '../modals/library-search-modal/library-search-modal.module';
import { FloraFormImageModule } from 'src/app/components/flora-form-image/flora-form-image.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    FloraFormImageModule,
    ForSubmittedViewPageRoutingModule,
    LibrarySearchModalPageModule,
  ],
  declarations: [ForSubmittedViewPage]
})
export class ForSubmittedViewPageModule {}
