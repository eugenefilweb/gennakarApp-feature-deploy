import { Injectable } from '@angular/core';

import { Network as CapacitorNetwork } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';
import { Network } from '../types/general.type';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  network: BehaviorSubject<Network> = new BehaviorSubject({
    connected: false,
    connectionType: 'none'
  });

  constructor() {
    CapacitorNetwork.addListener('networkStatusChange', (status: Network) => {
      this.network.next(status);
    });

    this.getNetwork();
  }

  async getNetwork(): Promise<Network> {
    const status: Network = await CapacitorNetwork.getStatus();
    this.network.next(status);

    return status;
  }
}
