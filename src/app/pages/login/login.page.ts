import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ToastService } from './../../services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';

import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/storage/user.service';
import { GeneralService } from 'src/app/services/general.service';
import { LoginCredential } from 'src/app/types/general.type';
import { AuthConstants } from 'src/app/config/auth-constants';
import { User } from 'src/app/types/live.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  postData: LoginCredential = {
    username: '',
    password: '',
  };

  loginBgImage: string = AuthConstants.LOGIN_BG_IMAGE;
  mainLogoImage: string = AuthConstants.MAIN_LOGO_IMAGE;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _toast: ToastService,
    private _loading: LoadingService,
    private _menu: MenuController,
    private _user: UserService,
    private _general: GeneralService
  ) {
    this._menu.enable(false);
  }

  ngOnInit() {}

  validateInputs(): boolean {
    const username: string = this.postData.username.replace(/^\s+|\s+$/g, '');
    const password: string = this.postData.password.replace(/^\s+|\s+$/g, '');

    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  toggleShow() {
    this.passwordType = this.passwordType === 'number' ? 'password' : 'number';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  loginAction() {
    if (!this.validateInputs()) {
      this._toast.presentToast(
        'Login Failed',
        'Please enter username or password',
        'bottom',
        'danger',
        'close-circle-outline'
      );
    } else {
      this._loading.showLoading('Please Wait ..');
      this._auth.login(this.postData).subscribe(
        (res: any) => {
          const { status, user } = res.data;

          if (status) {
            this._user.set(user, () => {
              this._loading.hideLoading();
              this._router.navigate(['tabs']);
            });
          } else {
            this._loading.hideLoading();
            let errorMessage: string = res.data.error.username || res.data.error.password;
            this._toast.presentToast(
              'Error',
              errorMessage,
              'bottom',
              'danger',
              'close-circle-outline'
            );
          }
        },
        (error: any) => {
          this._loading.hideLoading();
          this._toast.presentToast(
            'Network Problem',
            'Login Failed, Please Check your Connection ' + error.errorMessage,
            'middle',
            'warning',
            'wifi-outline'
          );
        }
      );
    }
  }

  async ionViewWillEnter() {
    const user: User = await this._user.get();

    if (user && this._general.objectNotEmpty(user)) {
      this._router.navigateByUrl('/pages/login', { replaceUrl: true });
    } else {
      this._menu.enable(false);
    }
  }

  ionViewDidLeave() {
    // enable the root left _menu when leaving the tutorial page
    this._menu.enable(true);
  }
}
