import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentalIncidentFormPageRoutingModule } from './environmental-incident-form-routing.module';

import { EnvironmentalIncidentFormPage } from './environmental-incident-form.page';
import { DismissButtonModule } from 'src/app/components/dismiss-button/dismiss-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentalIncidentFormPageRoutingModule,
    DismissButtonModule
  ],
  declarations: [EnvironmentalIncidentFormPage]
})
export class EnvironmentalIncidentFormPageModule {}
