import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { ShowHidePasswordModule } from 'src/app/components/show-hide-password/show-hide-password.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowHidePasswordModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  ],
 
  declarations: [LoginPage]
})
export class LoginPageModule {}
