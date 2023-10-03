import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrolHistoryCardComponent } from './patrol-history-card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PatrolHistoryCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [PatrolHistoryCardComponent]
})
export class PatrolHistoryCardModule { }
