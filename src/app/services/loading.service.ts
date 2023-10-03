import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
	providedIn: 'root'
})
export class LoadingService {

	constructor(
		private _loadingController: LoadingController
		) { }

	async showLoading(message: string) {
		const loading: any = await this._loadingController.create({
			message,
			cssClass: 'custom-loading',
		});

		await loading.present();
	}

	hideLoading() {
		setTimeout(() => {
			this._loadingController.dismiss().then((res: any) => {
				// console.log('loading dismissed', res);
			}).catch(err => {
				// console.log('Error occured : ', err);
			})
		}, 500);
	}
}