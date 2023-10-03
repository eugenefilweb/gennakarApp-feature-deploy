import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { PatrolsService } from './storage/patrols.service';
import { UserService } from './storage/user.service';
import { Fauna, Flora, Patrol } from '../types/general.type';
import { User } from '../types/live.type';
import { BehaviorSubject } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from './storage/storage.service';

@Injectable({
	providedIn: 'root'
})
export class FloraService {

	public patrols: Patrol[] = [];

	floras: BehaviorSubject<Fauna[]> = new BehaviorSubject([]);
	florasStorage: string = AuthConstants.FLORAS;
	
	constructor(
		private _loading: LoadingController,
		private httpService: HttpService,
		private _patrols: PatrolsService,
		private _user: UserService,
		private _alert: AlertController,
		private storageService: StorageService
	) {
		this._patrols.patrols.subscribe((patrols: Patrol[]) => {
			this.patrols = patrols || [];
		});
	}

	async alertSyncFlora() {
		const alert: any = await this._alert.create({
			header: 'Sync Patrols?',
			message: 'All pending patrol will be send to server.',
			cssClass: 'custom-alertSync',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => { },
				},
				{
					text: 'Yes',
					role: 'confirm',
					handler: () => {
						// this.submitPatrolForm();
					},
				},
			],
		});

		alert.present();
	}

	async initLoading() {
		const loading: any = await this._loading.create({
			spinner: "circles"
		});

		loading.present();
	}

	submitPatrolForm() {

		// this.initLoading();
		const { access_token }: User = this._user.user.value;
		return this.httpService.post('patrol/sync?access-token=' + access_token, this.patrols);
		this.httpService.post('patrol/sync?access-token=' + access_token, this.patrols)
			.subscribe((data: any) => {
				this._loading.dismiss();
				if (data.status) {
					if (data.data.error) {
						this.alertMessage('Sync Failed!', data.data.message || 'Something went wrong');
					}
					else {
						this._patrols.set([]);
						this.alertMessage('Sync Success', 'Data saved to the server.');
					}
				}
			}, (error: any) => {
				this._loading.dismiss();
				this.alertMessage('Sync Failed!', 'Something went wrong');
			});
	}

	async alertMessage(header: string, message: string) {
		const alert: any = await this._alert.create({
			header,
			message,
			cssClass: 'custom-alertSync',
			buttons: [
				{
					text: 'OK',
					role: 'confirm',
					handler: () => { },
				},
			],
		})
		alert.present();
	}

	async setFlora(floraData: Flora, callback: Function = (() => { })) {
		let floras: Flora[] = await this.storageService.get(this.florasStorage) || [];
		floras.push(floraData);

		await this.storageService.set(this.florasStorage, floras);
		this.floras.next(floras);

		callback(floras);
	}
}
