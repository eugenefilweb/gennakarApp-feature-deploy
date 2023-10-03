import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { OpenlayerMapModule } from 'src/app/components/openlayer-map/openlayer-map.module';
import { OpenlayerMapComponent } from 'src/app/components/openlayer-map/openlayer-map.component';
import { HeaderNavModule } from 'src/app/components/header-nav/header-nav.module';
import { MenuButtonModule } from 'src/app/components/menu-button/menu-button.module';

@NgModule({
    
    declarations: [DashboardPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OpenlayerMapModule,
        DashboardPageRoutingModule,
        HeaderNavModule,
        MenuButtonModule
    ],
    exports: [DashboardPage],
})
export class DashboardPageModule {}
