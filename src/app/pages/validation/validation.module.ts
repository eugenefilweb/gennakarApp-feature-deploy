import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidationPageRoutingModule } from './validation-routing.module';

import { ValidationPage } from './validation.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ValidationViewModalPageModule } from '../modals/validation-view-modal/validation-view-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ValidationPageRoutingModule,
    ValidationViewModalPageModule
  ],
  declarations: [ValidationPage]
})
export class ValidationPageModule {}
