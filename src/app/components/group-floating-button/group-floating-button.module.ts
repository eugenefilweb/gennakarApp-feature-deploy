import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { GroupFloatingButtonComponent } from './group-floating-button.component';
import { FormsModule } from '@angular/forms';
import { MenuButtonModule } from '../menu-button/menu-button.module';
import { EnvironmentalIncidentModalPageModule } from 'src/app/pages/modals/environmental-incident-modal/environmental-incident-modal.module';

@NgModule({
  declarations: [GroupFloatingButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    EnvironmentalIncidentModalPageModule
    
  ],
  exports: [GroupFloatingButtonComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GroupFloatingButtonModule {}
