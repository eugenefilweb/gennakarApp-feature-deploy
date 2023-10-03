import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTextComponent } from './skeleton-text.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SkeletonTextComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[SkeletonTextComponent]
})
export class SkeletonTextModule { }
