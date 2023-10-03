import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { IncidentService } from 'src/app/services/storage/incident.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { EnvironmentalIncident } from 'src/app/types/general.type';

@Component({
  selector: 'app-incident-card',
  templateUrl: './incident-card.component.html',
  styleUrls: ['./incident-card.component.scss'],
})
export class IncidentCardComponent implements OnInit {
  @Input() category?: string;
  @Input() datetime?: any;
  @Input() watershed?: string;
  @Input() description?: string;
  @Output() handleClick: any = new EventEmitter<any>();
  @Input() index: any;
  @Input() key: any;
  @Input() viewCallFunction: Function = (() => {});
  @Input() updateCallFunction: Function = (() => {});
  @Input() deleteCallFunction: Function = (() => {});

  incident: EnvironmentalIncident[];

  constructor(
    public _modal: ModalController,
    public _storage: StorageService,
    public _incident: IncidentService
  ) {

  }

  ngOnInit() { }
  

  updateEnvironmentalIncidentModal() {
    console.log("update");
  }
  async deleteEnvironmentalIncidentModal() {
    this._incident.deleteIncident(this.key)
    // let incidents: EnvironmentalIncident[] = await this._storage.get(AuthConstants.INCIDENT);
    // let filteredIncident = incidents.filter((incident: any) => incident.key !== this.key.key);
    // this._storage.set(AuthConstants.INCIDENT, filteredIncident);
  }

  // async viewEnvironmentalIncidentModal() {
  //   console.log('index', this.key);
  //   // const field: any = index || '';
  //   const field: any = this.key || '';
  //   const modal = await this._modal.create({
  //     component: EnvironmentalIncidentViewPage,
  //     componentProps: {
  //       user_id: field.user_id,
  //       date_time: field.date_time,
  //       longitude: field.longitude,
  //       latitude: field.latitude,
  //       watershed: field.watershed,
  //       description: field.description,
  //       additional_details: field.additional_details,
  //       key: field.key,
  //       category: field.category
  //     },
  //   });
  //   return modal.present();
  // }

  onChangeInChild(eventObject: any) {
    this.handleClick.emit(eventObject);
  }
}
