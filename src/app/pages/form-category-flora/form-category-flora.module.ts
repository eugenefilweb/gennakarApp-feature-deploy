import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCategoryFloraPageRoutingModule } from './form-category-flora-routing.module';

import { FormCategoryFloraPage } from './form-category-flora.page';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';
import { DismissButtonModule } from 'src/app/components/dismiss-button/dismiss-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCategoryFloraPageRoutingModule,
    MenuButtonModule,
    DismissButtonModule
  ],
  declarations: [FormCategoryFloraPage]
})
export class FormCategoryFloraPageModule {}
