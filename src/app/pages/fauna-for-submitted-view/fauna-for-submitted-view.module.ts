import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaunaForSubmittedViewPageRoutingModule } from './fauna-for-submitted-view-routing.module';

import { FaunaForSubmittedViewPage } from './fauna-for-submitted-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaunaForSubmittedViewPageRoutingModule
  ],
  declarations: [FaunaForSubmittedViewPage]
})
export class FaunaForSubmittedViewPageModule {}
