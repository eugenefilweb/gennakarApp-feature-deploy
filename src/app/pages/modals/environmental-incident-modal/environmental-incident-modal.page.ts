import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides, ModalController } from '@ionic/angular';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { SettingsService } from 'src/app/services/storage/settings.service';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Scrollbar,
  Zoom,
  EffectFade,
  EffectCube,
} from 'swiper';
import { SwiperOptions } from 'swiper';
import { IncidentService } from 'src/app/services/storage/incident.service';
import { EnvironmentalIncident } from 'src/app/types/general.type';
import { EnvironmentalIncidentFormPage } from '../environmental-incident-form/environmental-incident-form.page';
import { GeneralSetting, incidentSetting } from 'src/app/types/live.type';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { log } from 'console';

SwiperCore.use([
  Autoplay,
  Keyboard,
  Scrollbar,
  Zoom,
  EffectFade,
  IonicSlides,
  EffectCube,
]);

@Component({
  selector: 'app-environmental-incident-modal',
  templateUrl: './environmental-incident-modal.page.html',
  styleUrls: ['./environmental-incident-modal.page.scss'],
})
export class EnvironmentalIncidentModalPage implements OnInit {
  public successCallback: Function = () => {};
  public errorCallback: Function = () => {};

  user_id: number;
  date_time: number;
  longitude: any;
  latitude: any;
  watershed: string;
  description: string;
  additional_details: string;
  barangay: string;
  sitio: string;
  incidentPhotos: any = [];
  incident: EnvironmentalIncident[] = [];
  incidentSetting: any;
  key: number = 0;
  status: boolean = false;

  incidentIcon: {id:number, icon: string}[] = [
		{id: 1, icon: "/assets/icon/incident/Logging.png"},
		{id: 2, icon: "/assets/icon/incident/kaingin.png"},
		{id: 3, icon: "/assets/icon/incident/encroachment.png"},
		{id: 4, icon: "/assets/icon/incident/Pouching.png"},
		{id: 5, icon: "/assets/icon/incident/soil-erosion.png"},
		{id: 6, icon: "/assets/icon/incident/illegal-activities.png"},
		{id: 7, icon: "/assets/icon/incident/water-pollution.png"},
		{id: 8, icon: "/assets/icon/incident/damage-infra.png"},
		{id: 9, icon: "/assets/icon/incident/other-pollutants.png"}
	];

  constructor(
    public _modal: ModalController,
    // public _router: Router,
    public _settings: SettingsService,
    public _currentPatrol: CurrentPatrolService,
    public _incident: IncidentService,
    private _storage: StorageService
  ) {
    this._incident.incident.subscribe((incidents: EnvironmentalIncident[]) => {
      if (incidents) {
        this.incident = incidents;
      }
    });

    this._storage.get(AuthConstants.SETTINGS).then((setting: any) => {
      if (setting.incidents) {
        this.incidentSetting = setting.incidents;
        console.log('this.incidentSetting', this.incidentSetting);
      }
    });
  }

  ngOnInit() {
    // this.getEnvironmentalIncident();
    
  }

  filtedIncidentIcon(id: number) {
    return this.incidentIcon.find(incident => incident.id == id);
  }

  hideModal() {
    this._modal.dismiss();
    this.errorCallback();
  }

  checkTrue() {
    this.status = true;
    console.log(this.status);
  }

  checkFalse() {
    this.status = false;
    console.log(this.status);
  }

  getEnvironmentalIncident() {
    this._incident.getIncident((res: any) => {
      let field = res || [];
      this.user_id = field.user_id;
      this.date_time = field.date_time;
      this.longitude = field.longitude;
      this.latitude = field.latitude;
      this.watershed = field.watershed;
      this.description = field.description;
    });
  }

  async modalViewIncidentForm(param: any) {
    const modal = await this._modal.create({
      component: EnvironmentalIncidentFormPage,
      componentProps: {
        icon : param.icon,
        category_id: param.id,
        id: new Date().getTime(),
        incident_type: param.incident_type,
        label: param.label,
        label_eng: param.label_eng,
        latitude: this.latitude,
        longitude: this.longitude,
      },
      cssClass: 'incident_modal_custom',
    });

    return modal.present();
  }
}
