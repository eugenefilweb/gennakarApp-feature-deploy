
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/storage/settings.service';
import { CurrentPatrol} from 'src/app/types/general.type';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Settings, Watershed } from 'src/app/types/live.type';

@Component({
  selector: 'app-select-watershed',
  templateUrl: './select-watershed.page.html',
  styleUrls: ['./select-watershed.page.scss'],
})
export class SelectWatershedPage implements OnInit {
  public watersheds: any[] = [];
  public successCallback: Function = (() => { });
  public errorCallback: Function = (() => { });

  constructor(
    public _modal: ModalController,
    public _router: Router,
    public _settings: SettingsService,
    public _currentPatrol: CurrentPatrolService,
  ) {
    this._settings.settings.subscribe((settings: Settings) => {
      this.watersheds = settings && (settings.watersheds || []);
    });
  }

  ngOnInit() {
  }

  selectWatershed(watershed: Watershed) {
    // this._currentPatrol.start('', watershed.name, (patrol: CurrentPatrol) => {
    //   this._modal.dismiss();
    //   this.successCallback()

    //   this._router.navigate(['/map']);
    // });
  }

  hideModal() {
    this._modal.dismiss();
    this.errorCallback();
  }
}
