import { Injectable } from '@angular/core';
import { AuthConstants } from '../config/auth-constants';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
	providedIn: 'root'
})

export class IndexGuard implements CanActivate {

	constructor(
		private _storage: StorageService,
		private _router: Router
	) { }

	canActivate(): Promise<boolean> {
		return new Promise(resolve => {
			this._storage.get(AuthConstants.AUTH).then((res: any) => {
				if (res) {
					this._router.navigate(['tabs']);
					resolve(false);
				}
				else {
					resolve(true);
				}
			})
				.catch((err: any) => {
					resolve(true);
				});
		});
	}
}
