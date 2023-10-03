import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentCardComponent } from './incident-card.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IncidentCardComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [IncidentCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IncidentCardModule {}
