import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { EnvironmentalIncidentFormPageRoutingModule } from './environmental-incident-form-routing.module';

import { EnvironmentalIncidentFormPage } from './environmental-incident-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentalIncidentFormPageRoutingModule,
  ],
  declarations: [EnvironmentalIncidentFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnvironmentalIncidentFormPageModule {}
