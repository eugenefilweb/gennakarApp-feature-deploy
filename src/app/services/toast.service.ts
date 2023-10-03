import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	constructor(public toastController: ToastController) { }
	async presentToast(header: string, message: string, position: 'top' | 'bottom' | 'middle', color: string, icon: string ) : Promise<void> {
		const toast: any = await this.toastController.create({
			header: header,
			message: message,
			cssClass: 'toastcustom',
			icon: icon,
			mode: 'ios',
			animated: true,
			duration: 1500,
			position: position,
			color: color,
		});
		toast.present();
	}
}
