import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordComponent } from './show-hide-password.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ShowHidePasswordComponent],
  imports: [ CommonModule, IonicModule],
  exports: [ShowHidePasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShowHidePasswordModule { }
