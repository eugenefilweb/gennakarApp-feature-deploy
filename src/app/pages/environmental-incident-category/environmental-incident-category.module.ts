import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentalIncidentCategoryPageRoutingModule } from './environmental-incident-category-routing.module';

import { EnvironmentalIncidentCategoryPage } from './environmental-incident-category.page';
import { DismissButtonModule } from 'src/app/components/dismiss-button/dismiss-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentalIncidentCategoryPageRoutingModule,
    DismissButtonModule
  ],
  declarations: [EnvironmentalIncidentCategoryPage]
})
export class EnvironmentalIncidentCategoryPageModule {}
