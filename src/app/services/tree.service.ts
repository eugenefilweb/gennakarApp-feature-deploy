import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
@Injectable({
	providedIn: 'root'
})
export class TreeService {

	treeDataValidated = new BehaviorSubject({});
	treeDataValidation = new BehaviorSubject({});

	constructor(
		private _auth: AuthService,
		private _http: HttpService
	) {
	}

	async getTreesDataValidated(page: number = 1) {
		await this._auth.user.subscribe((response: any) => {
			if (response.access_token) {
				this._http.get('tree', {
					'access-token': response.access_token,
					'status': 1,
					'page': page
				}).subscribe((res: any) => {
					if (res.data.tree) {
						this.treeDataValidated.next(res.data);
					}
				})
			}
		})
	}

	async getTreesDataValidation(page: number = 1) {
		await this._auth.user.subscribe((response: any) => {
			if (response.access_token) {
				this._http.get('tree', {
					'access-token': response.access_token,
					'status': 0,
					'page': page
				}).subscribe((res: any) => {
					if (res.data.tree) {
						this.treeDataValidation.next(res.data);
					}
				})
			}
		})
	}
}
