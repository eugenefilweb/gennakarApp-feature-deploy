import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenlayerMapComponent } from './openlayer-map.component';



@NgModule({
  declarations: [OpenlayerMapComponent],
  imports: [CommonModule],
  exports: [OpenlayerMapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenlayerMapModule { }
