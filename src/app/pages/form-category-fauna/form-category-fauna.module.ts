import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormCategoryFaunaPageRoutingModule } from './form-category-fauna-routing.module';
import { FormCategoryFaunaPage } from './form-category-fauna.page';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';
import { FormCaptureFaunaPage } from '../form-capture-fauna/form-capture-fauna.page';
import { MapPageModule } from '../map/map.module';
import { GroupFloatingButtonComponent } from 'src/app/components/group-floating-button/group-floating-button.component';
import { GroupFloatingButtonModule } from 'src/app/components/group-floating-button/group-floating-button.module';

@NgModule({
  declarations: [FormCategoryFaunaPage, FormCaptureFaunaPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCategoryFaunaPageRoutingModule,
    MenuButtonModule,
  ],
  exports: [FormCategoryFaunaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormCategoryFaunaPageModule {}
