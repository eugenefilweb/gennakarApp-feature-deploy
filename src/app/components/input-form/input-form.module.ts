import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './input-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [InputFormComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [InputFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InputFormModule { }
