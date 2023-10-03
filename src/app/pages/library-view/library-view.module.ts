import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LibraryViewPageRoutingModule } from './library-view-routing.module';

import { LibraryViewPage } from './library-view.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    LibraryViewPageRoutingModule
  ],
  declarations: [LibraryViewPage]
})
export class LibraryViewPageModule {}
