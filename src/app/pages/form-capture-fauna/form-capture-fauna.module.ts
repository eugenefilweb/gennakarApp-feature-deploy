import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCaptureFaunaPageRoutingModule } from './form-capture-fauna-routing.module';

import { FormCaptureFaunaPage } from './form-capture-fauna.page';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';
import { FormCategoryFaunaPageModule } from '../form-category-fauna/form-category-fauna.module';
import { GroupFloatingButtonModule } from 'src/app/components/group-floating-button/group-floating-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCaptureFaunaPageRoutingModule,
    MenuButtonModule,
  ],
  declarations: [FormCaptureFaunaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormCaptureFaunaPageModule {}
