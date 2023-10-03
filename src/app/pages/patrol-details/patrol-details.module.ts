import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatrolDetailsPageRoutingModule } from './patrol-details-routing.module';

import { PatrolDetailsPage } from './patrol-details.page';
import { DismissButtonModule } from 'src/app/components/dismiss-button/dismiss-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatrolDetailsPageRoutingModule,
    DismissButtonModule
  ],
  declarations: [PatrolDetailsPage]
})
export class PatrolDetailsPageModule {}
