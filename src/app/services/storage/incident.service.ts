import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { UserService } from './user.service';
import { User } from 'src/app/types/live.type';
import {
  EnvironmentalIncident,
  incidentPhoto,
} from 'src/app/types/general.type';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  environmentalIncident: string = AuthConstants.INCIDENT;
  incident: BehaviorSubject<EnvironmentalIncident[]> = new BehaviorSubject([]);
  
  constructor(private _storage: StorageService) {
    this.init();
  }

  /**
   * set empty array as the initial value of incident
   */
  init() {
    this._storage
      .get(this.environmentalIncident)
      .then((environmentalIncident: EnvironmentalIncident[]) => {
        this.incident.next(environmentalIncident || []);
      });
  }

	async set(data: EnvironmentalIncident[], callback: Function = (() => { })) {
		const response: EnvironmentalIncident[] = await this._storage.set(this.environmentalIncident, data);
		this.incident.next(data);
	
		callback(response);
  }

  async addIncident(incident: EnvironmentalIncident) {
    let incidents: EnvironmentalIncident[] = (await this._storage.get(this.environmentalIncident)) || [];

    incidents.push(incident);

    this._storage.set(this.environmentalIncident, incidents);

    this.incident.next(incidents);
  }

  async getIncident(callback: Function = () => {}) {
    let environmentalIncident: EnvironmentalIncident[] = (await this._storage.get(this.environmentalIncident)) || [];
    this.incident.next(environmentalIncident);
    callback(environmentalIncident);
  }

  // async updateIncident(key: number | string, incident: EnvironmentalIncident,  callback: Function = (() => { })) {
  //   let incidents: EnvironmentalIncident[] = (await this._storage.get(this.environmentalIncident)) || [];
    
  //   if (incidents.length) {
  //     const index: number = incidents.findIndex((i: EnvironmentalIncident) => i.key == key);
  //     incidents[index] = incident;

  //     await this._storage.set(AuthConstants.INCIDENT, incidents);

  //     this.incident.next(incidents);
  //   }

  //   callback({ incidents, incident, key });
  // }

  async deleteIncident(key: number, callback: Function = () => {}) {
    let incidents: EnvironmentalIncident[] = (await this._storage.get(this.environmentalIncident)) || [];
    
    if (incidents.length) {
      incidents.splice(key, 1);
    }
    
    await this._storage.set(this.environmentalIncident, incidents);
    this.incident.next(incidents);
    callback(incidents);
  } 
  
}
