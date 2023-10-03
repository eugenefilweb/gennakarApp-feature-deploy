import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DismissButtonComponent } from './dismiss-button.component';



@NgModule({
  declarations: [DismissButtonComponent],
  imports: [
    CommonModule,
  ],
  exports: [DismissButtonComponent]
})
export class DismissButtonModule { }
