import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidatedPageRoutingModule } from './validated-routing.module';

import { ValidatedPage } from './validated.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ValidatedViewModalPageModule } from '../modals/validated-view-modal/validated-view-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ValidatedPageRoutingModule,
    ValidatedViewModalPageModule
  ],
  declarations: [ValidatedPage]
})
export class ValidatedPageModule {}
