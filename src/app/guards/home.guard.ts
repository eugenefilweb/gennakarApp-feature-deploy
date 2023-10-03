import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
	providedIn: 'root'
})
export class HomeGuard implements CanActivate {

	constructor(
		private _storage: StorageService,
		private _router: Router
	) { }
	canActivate(): Promise<boolean> {
		return new Promise(resolve => {
			this._storage.get(AuthConstants.AUTH).then(res => {
				if (res) {
					resolve(true);
				} else {
					this._router.navigate(['login']);
					resolve(false);
				}
			})
			.catch(err => {
				// console.log(err);
				resolve(false);
			});
		});
	}
}