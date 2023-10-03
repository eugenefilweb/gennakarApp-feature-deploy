import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatrolButtonComponent } from './patrol-button.component';

@NgModule({
  declarations: [PatrolButtonComponent],
  imports: [CommonModule],
  exports: [PatrolButtonComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrolButtonModule {}
