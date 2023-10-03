import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForSubmittedPageRoutingModule } from './for-submitted-routing.module';

import { ForSubmittedPage } from './for-submitted.page';
import { ForSubmittedViewPageModule } from '../for-submitted-view/for-submitted-view.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ForSubmittedPageRoutingModule,
    ForSubmittedViewPageModule,
  ],
  declarations: [ForSubmittedPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForSubmittedPageModule {}
