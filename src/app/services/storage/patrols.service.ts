import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthConstants } from 'src/app/config/auth-constants';
import { StorageService } from './storage.service';
import { Patrol } from 'src/app/types/general.type';

@Injectable({
  providedIn: 'root'
})
export class PatrolsService {
  name: string = AuthConstants.PATROLS;

  patrols: BehaviorSubject<Patrol[]> = new BehaviorSubject([]);

  constructor(
    private _storage: StorageService,
  ) {
    this.init();
  }

  init() {
    this._storage.get(this.name).then((patrols: Patrol[]) => {
      this.patrols.next(patrols || []);
    });
  }

  async addPatrol(patrol: Patrol, callback: Function = (() => { })) {
    let patrols: Patrol[] = await this._storage.get(this.name) || [];

    patrol.syncStatus = 'Pending';
    patrol.lastTimestamp = new Date().getTime();

    patrols.push(patrol);

    this._storage.set(this.name, patrols);

    this.patrols.next(patrols);
    callback(patrols);
  }

  async set(data: Patrol[], callback: Function = (() => { })) {
    const response: Patrol[] = await this._storage.set(this.name, data);
    this.patrols.next(data);

    callback(response);
  }

  async changeSyncStatus(callback:Function = (() => {})) {
    const patrols: Patrol[] = await this._storage.get(this.name) || [];

    if (patrols.length) {
      let newPatrols:Patrol[] = [];
      for (let index = 0; index < patrols.length; index++) {
        const patrol: Patrol = patrols[index];

        patrol.syncStatus = 'Syncing';

        newPatrols.push(patrol);
      }

      this.set(newPatrols, callback);
    }
  }

}
