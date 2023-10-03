import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaunaForSubmittedPageRoutingModule } from './fauna-for-submitted-routing.module';

import { FaunaForSubmittedPage } from './fauna-for-submitted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaunaForSubmittedPageRoutingModule
  ],
  declarations: [FaunaForSubmittedPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaunaForSubmittedPageModule {}
