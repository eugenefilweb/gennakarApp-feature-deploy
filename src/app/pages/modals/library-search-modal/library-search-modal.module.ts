import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrarySearchModalPageRoutingModule } from './library-search-modal-routing.module';

import { LibrarySearchModalPage } from './library-search-modal.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LibrarySearchModalPageRoutingModule
  ],
  declarations: [LibrarySearchModalPage]
})
export class LibrarySearchModalPageModule {}
