import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentalIncidentReportPageRoutingModule } from './environmental-incident-report-routing.module';

import { EnvironmentalIncidentReportPage } from './environmental-incident-report.page';
import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentalIncidentReportPageRoutingModule,
    // HeaderNavModule,
    MenuButtonModule
  ],
  declarations: [EnvironmentalIncidentReportPage]
})
export class EnvironmentalIncidentReportPageModule {}
