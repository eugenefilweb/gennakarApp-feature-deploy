import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormFloraPageRoutingModule } from './form-flora-routing.module';

import { FormFloraPage } from './form-flora.page';
import { InputFormModule } from 'src/app/components/input-form/input-form.module';
import { FloraFormImageModule } from 'src/app/components/flora-form-image/flora-form-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputFormModule,
    FormFloraPageRoutingModule,
    FloraFormImageModule
  ],
  declarations: [FormFloraPage]
})
export class FormFloraPageModule {}
