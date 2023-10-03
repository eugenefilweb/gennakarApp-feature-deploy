import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/types/live.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  name: string = AuthConstants.AUTH;
  INIT_DATA: User = {
    access_token: "at",
    created_at: "",
    created_by: 0,
    email: "",
    firstname: "Offline",
    google2fa: "",
    google2fa_ts: 0,
    id: 0,
    isDeveloper: false,
    is_blocked: 1,
    lastname: "Offline",
    lastname_initial: "O",
    login_type: 2,
    photo: "",
    photoLink: "",
    position: null,
    record_status: 1,
    role_id: 1,
    slug: "offline",
    status: 10,
    updated_at: "",
    updated_by: 0,
    userPhotoIcon: "",
    userPhotoLink: "",
    username: "offline",
    verification_token: "vt"
  }

  user: BehaviorSubject<User> = new BehaviorSubject(this.INIT_DATA);

  constructor(
    private _storage: StorageService,
  ) {
    this.init();
  }

  init() {
    this._storage.get(this.name).then((user: User) => {

      this.user.next(user || this.INIT_DATA);

    });
  }

  async set(data: User, callback: Function = (() => { })) {
    
    const response: User = await this._storage.set(this.name, data);

    this.user.next(response || this.INIT_DATA);

    callback(response);

  }

  async get(): Promise<User> {

    const response: User = await this._storage.get(this.name);

    return response;

  }

  async remove(): Promise<User> {

    const response: User = await this._storage.remove(this.name);

    this.user.next(this.INIT_DATA);

    return response;

  }
}