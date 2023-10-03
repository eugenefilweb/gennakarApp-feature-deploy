import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthService } from './services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from './services/storage/user.service';
import { GeolocationService } from './services/geolocation.service';
import { AuthConstants } from './config/auth-constants';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { User } from './types/live.type';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedPath = '';
  headerPageItemMenu = [
    { title: 'Dashboard', url: '/tabs/dashboard', icon: 'home' },
    { title: 'Flora', url: '/tabs/flora', icon: 'leaf' },
    { title: 'Fauna', url: '/tabs/fauna', icon: 'paw' },
    { title: 'Library', url: '/tabs/library', icon: 'book' },
    { title: 'Map', url: '/tabs/map', icon: 'map' },
    { title: 'My Patrols', url: '/tabs/patrol-history', icon: 'flag' },
    { title: 'Profile', url: '/tabs/profile', icon: 'person' },
    // { title: 'Settings', url: '/tabs/flora/validation-view', icon: 'fa-solid fa-gear' },
  ];

  sideMenuItem = [
    { title: 'Home', url: '/tabs/dashboard', icon: './../assets/icon/Sidebar Icons/SVG/Vector.svg' },
    { title: 'Flora', url: '/tabs/flora', icon: './../assets/icon/Sidebar Icons/SVG/Flora.svg' },
    { title: 'Fauna', url: '/tabs/fauna', icon: './../assets/icon/Sidebar Icons/SVG/Bird.svg' },
    { title: 'Patrol List', url: '/tabs/patrol-history', icon: './../assets/icon/Sidebar Icons/SVG/Patrol-List.svg' },
    { title: 'Incident Report', url: 'environtmental-incident-report', icon: './../assets/icon/Sidebar Icons/SVG/Incident-Report.svg' },
  ];



  logout = { title: 'Logout', icon: 'log-out-outline' };

  secondaryLogoImage: string = AuthConstants.SECONDARY_LOGO_IMAGE;
  logoGawa: string = AuthConstants.LOGO_GAWA;

  user: User;

  constructor(
    private _auth: AuthService,
    private _alert: AlertController,
    private _route: Router,
    private _user: UserService,
    private _geolocation: GeolocationService,
  ) {
    this._route.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
    defineCustomElements(window);

    this._user.user.subscribe((user: User) => {
      this.user = user;
    });

    this._geolocation.trackGeolocation();
  }

  setStatusBackgroundColor = async () => {
    await StatusBar.setBackgroundColor({ color: '#004634' });
  }

  ngOnInit() {
    if (Capacitor.getPlatform() != 'web') {
      this.setStatusBackgroundColor();
    }
  }

  logoutAction() {
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this._alert.create({
      header: 'Logout?',
      message: 'Please confirm your action',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Alert canceled');
          },
        },
        {
          text: 'Logout',
          role: 'confirm',
          handler: () => {
            this._auth.logout();
          },
        },
      ],
    });

    await alert.present();
  }
}
