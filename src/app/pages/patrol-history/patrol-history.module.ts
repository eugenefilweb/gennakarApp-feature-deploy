import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PatrolHistoryPage } from './patrol-history.page';
  
import { SelectWatershedPageModule } from '../modals/select-watershed/select-watershed.module';
 
import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';
import { PatrolHistoryPageRoutingModule } from './patrol-history-routing.module';
import { PatrolHistoryDetailsPageModule } from '../patrol-history-details/patrol-history-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatrolHistoryPageRoutingModule,
    HeaderNavModule,
    SelectWatershedPageModule,
    PatrolHistoryDetailsPageModule,
  ],
  declarations: [PatrolHistoryPage]
})
export class PatrolHistoryPageModule {}
