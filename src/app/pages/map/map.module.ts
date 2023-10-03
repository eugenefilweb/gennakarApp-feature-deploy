import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapPageRoutingModule } from './map-routing.module';
import { MapPage } from './map.page';
import { OpenlayerMapModule } from 'src/app/components/openlayer-map/openlayer-map.module';
import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';
import { LocationPickerPageModule } from '../location-picker/location-picker.module';
import { FormCategoryFaunaPageModule } from '../form-category-fauna/form-category-fauna.module';
import { FormCaptureFaunaPageModule } from '../form-capture-fauna/form-capture-fauna.module';
import { FormCaptureFloraPageModule } from '../form-capture-flora/form-capture-flora.module';
import { EnvironmentalIncidentModalPageModule } from '../modals/environmental-incident-modal/environmental-incident-modal.module';
import { FormCategoryFloraPageModule } from '../form-category-flora/form-category-flora.module';

@NgModule({
  declarations: [MapPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenlayerMapModule,
    MapPageRoutingModule,
    HeaderNavModule,
    MenuButtonModule,
    LocationPickerPageModule,
    FormCaptureFloraPageModule,
    FormCategoryFaunaPageModule,
    FormCategoryFloraPageModule,
    EnvironmentalIncidentModalPageModule,

  ],
  exports: [MapPage],
})
export class MapPageModule {}
