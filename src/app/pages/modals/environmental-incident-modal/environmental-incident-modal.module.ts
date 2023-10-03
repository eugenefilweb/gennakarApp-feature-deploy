import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentalIncidentModalPageRoutingModule } from './environmental-incident-modal-routing.module';

import { EnvironmentalIncidentModalPage } from './environmental-incident-modal.page';
import { GroupFloatingButtonModule } from 'src/app/components/group-floating-button/group-floating-button.module';
import { SwiperModule } from 'swiper/angular';
import { SvgIconModule } from 'src/app/components/svg-icon/svg-icon.module';
import { SwiperCategoryModule } from 'src/app/components/swiper-category/swiper-category.module';
import { IncidentCardModule } from 'src/app/components/incident-card/incident-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentalIncidentModalPageRoutingModule,
    IncidentCardModule,
  ],
  declarations: [EnvironmentalIncidentModalPage],
  // exports: [EnvironmentalIncidentModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnvironmentalIncidentModalPageModule {}
