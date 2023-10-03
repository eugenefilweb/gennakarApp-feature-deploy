import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { UserService } from './storage/user.service';
import { LoginCredential } from '../types/general.type';
import { Router } from '@angular/router';
import { User } from '../types/live.type';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	user: BehaviorSubject<User> = new BehaviorSubject<any>({});

	constructor(
		private _http: HttpService,
		private _user: UserService,
		private _route: Router,

	) {
		this._user.user.subscribe((user: User) => {
			this.user.next(user || this._user.INIT_DATA);
		});
	}

	getUserData(): User {
		return this.user.value;
	}


	login(postData: LoginCredential): Observable<any> {
		return this._http.postLogin('site/login', postData);
	}

	logout() {
		this._user.remove();
		this._route.navigate(['/login']);
	}


	getSettings(): Observable<any> {
		return this._http.get('setting/general');
	}
}