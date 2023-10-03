import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { FloraService } from 'src/app/services/flora.service';
import { PhotoNewService } from 'src/app/services/photo-new.service';
import { PhotoService } from 'src/app/services/photo.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { ToastService } from 'src/app/services/toast.service';
import { Photos } from 'src/app/types/general.type';

@Component({
	selector: 'app-form-capture-flora',
	templateUrl: './form-capture-flora.page.html',
	styleUrls: ['./form-capture-flora.page.scss'],
})
export class FormCaptureFloraPage implements OnInit {
	datepipe: DatePipe = new DatePipe('en-US');
	id: number = 0;
	key: any = 0;
	barangay: any = '';
	sitio: any = '';
	longitude: any;
	latitude: any;
	photos: Photos[] = [];
	category_id: number = 0;
	category_name: string = '';
	description: string = ''
	constructor(
		private photoService: PhotoService,
		private photoNewService: PhotoNewService,
		private currentPatrol: CurrentPatrolService,
		private toastController: ToastController,
		private toastService: ToastService,
		private modalController: ModalController,
		private floraService: FloraService,
		private alertController: AlertController
	) { }

	ngOnInit() {
		console.log('Id', this.id);
	}

	async addNewPhoto() {
		console.log('click');
		const photo: any = await this.photoNewService.addNewImage(this.key);
		this.photos.push(photo)
	}

	async loadingData(header: string, message: string) {
		try {
			this.toastService.presentToast(
				'Success',
				'Flora Added Successfully',
				'bottom',
				'success',
				'checkmark-circle'
			);
		} catch (err: any) {
			this.toastService.presentToast(
				'Failed',
				'Failed to load Data',
				'bottom',
				'danger',
				'alert-circle'
			);
		} finally {
		}
	}


	modalDismiss() {
		return this.modalController.dismiss();
	}

	saveFlora() {
		const date_encoded: string = this.datepipe.transform( new Date().getTime(),'YYYY-MMM-dd HH:mm:ss' );
		const flora: any = {
			appId: this.key || new Date().getTime(),
			barangay: this.currentPatrol.patrol.value.barangay,
			sitio: this.currentPatrol.patrol.value.sitio,
			longitude: this.longitude || 0,
			latitude: this.latitude || 0,
			category_id: this.category_id || 0,
			photos: this.photos || [],
			category_name: this.category_name || '',
			description: this.description || '',
			date_encoded: date_encoded || '0/0/0000',
		};

		this.floraService.setFlora(flora, () => {
			this.loadingData('Success', 'Flora Added Successfully');
			this.photoService.photos = [];
			this.modalDismiss();
		});
	}

	base64Path( base64Path: string ) {
		return this.photoService.base64Path(base64Path);
	}

	deletePhotoAtIndex( index: number ) {

		if (index >= 0 && index < this.photos.length) {
			// Filter the array to exclude the selected photo
			const filteredPhotos = this.photos.filter((photo, i) => i !== index);

			// Assign the filtered array to this.photo
			this.photos = filteredPhotos;
		} else {
			console.log("Invalid index.");
		}

	}

	
	async showLeaveConfirmation() {
		const alert = await this.alertController.create({
			header: 'Confirmation',
			message: `Are you sure you want to save this entry?`,
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => {
						this.modalDismiss();
					},
				},
				{
					text: 'Yes',
					role: 'confirm',
					handler: () => {
						this.saveFlora();
					},
				},
			],
		})

		await alert.present()
	}
}
