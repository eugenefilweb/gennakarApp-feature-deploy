import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatrolHistoryDetailsPageRoutingModule } from './patrol-history-details-routing.module';

import { PatrolHistoryDetailsPage } from './patrol-history-details.page';
import { OpenlayerMapModule } from 'src/app/components/openlayer-map/openlayer-map.module';
import { ForSubmittedViewPageModule } from '../for-submitted-view/for-submitted-view.module';
import { ValidationViewModalPageModule } from '../modals/validation-view-modal/validation-view-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatrolHistoryDetailsPageRoutingModule,
    OpenlayerMapModule,
    ForSubmittedViewPageModule,
    ValidationViewModalPageModule
  ],
  declarations: [PatrolHistoryDetailsPage]
})
export class PatrolHistoryDetailsPageModule {}
