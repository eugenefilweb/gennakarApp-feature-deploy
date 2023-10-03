import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http.service';
import { NetworkService } from '../network.service';
import { UserService } from './user.service';
import { Network } from 'src/app/types/general.type';
import { Library, User } from 'src/app/types/live.type';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  name: string = AuthConstants.LIBRARIES;
  libraries: BehaviorSubject<Library[]> = new BehaviorSubject([]);

  constructor(
    private _storage: StorageService,
    private _network: NetworkService,
    private _http: HttpService,
    private _user: UserService,
  ) {}

  async load(onlineCallback: Function = (() => { }), offlineCallback: Function = (() => { })) {
    const network: Network = await this._network.getNetwork();
    if (network.connected) {
      const { access_token }: User = this._user.user.value;

      this._http.get('library', {
        'access-token': access_token,
        "sort": 'common_name',
        "per-page": 500
      }).subscribe(async (response: any) => {
        const { status, data } = response;
        if (status) {
          await this._storage.set(this.name, data.library);
          this.libraries.next(data.library);
        }

        onlineCallback(data.library);
      });
    }
    else {
      this.get(offlineCallback);
    }
  }

  async set(data: Library[] = [], callback: Function = (() => { })) {
    const response: Library[] = await this._storage.set(this.name, data);
    this.libraries.next(data);

    callback(response);
  }

  async get(callback: Function = (() => { })) {
    const libraries: Library[] = await this._storage.get(this.name) || [];
    this.libraries.next(libraries);

    callback(libraries);
  }
}
