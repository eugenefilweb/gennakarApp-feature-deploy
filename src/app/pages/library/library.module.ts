import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LibraryPageRoutingModule } from './library-routing.module';

import { LibraryPage } from './library.page';
import { LibraryViewPageModule } from '../library-view/library-view.module'; //add child module for MODAL Controller

import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SkeletonTextModule } from 'src/app/components/skeleton-text/skeleton-text.module';


// import { ValuearrayPipe } from './valuearray.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    LibraryPageRoutingModule,
    LibraryViewPageModule,
    HeaderNavModule,
    SkeletonTextModule,
  ],
  declarations: [LibraryPage ]
})
export class LibraryPageModule {}
