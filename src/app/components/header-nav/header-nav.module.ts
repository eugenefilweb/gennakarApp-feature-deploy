import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './header-nav.component';
import { RouterModule } from '@angular/router';
import { PatrolButtonModule } from 'src/app/components/patrol-button/patrol-button.module';
import { GroupFloatingButtonModule } from '../group-floating-button/group-floating-button.module';
import { EnvironmentalIncidentModalPageModule } from 'src/app/pages/modals/environmental-incident-modal/environmental-incident-modal.module';
import { EnvironmentalIncidentFormPageModule } from 'src/app/pages/modals/environmental-incident-form/environmental-incident-form.module';

@NgModule({
  declarations: [HeaderNavComponent],
  imports: [
    CommonModule,
    EnvironmentalIncidentModalPageModule,
    EnvironmentalIncidentFormPageModule,
    PatrolButtonModule,
    GroupFloatingButtonModule,
  ],
  exports: [HeaderNavComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderNavModule {}
