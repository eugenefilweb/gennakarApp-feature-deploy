import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloraFormImageComponent } from './flora-form-image.component';

@NgModule({
  declarations: [FloraFormImageComponent],
  imports: [
    CommonModule,
  ],
  exports: [FloraFormImageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FloraFormImageModule { }
