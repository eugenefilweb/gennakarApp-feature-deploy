import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuButtonComponent } from './menu-button.component';
import { GroupFloatingButtonModule } from '../group-floating-button/group-floating-button.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
	declarations: [MenuButtonComponent],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		GroupFloatingButtonModule
	],
	exports: [MenuButtonComponent],
})
export class MenuButtonModule { }
