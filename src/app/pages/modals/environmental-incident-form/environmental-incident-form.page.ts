import { Component, OnInit } from '@angular/core';
import {  AlertController, ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { IncidentService } from 'src/app/services/storage/incident.service';
import { UserService } from 'src/app/services/storage/user.service';
import { CurrentPatrol, incidentPhoto } from 'src/app/types/general.type';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { NetworkService } from 'src/app/services/network.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { ToastService } from 'src/app/services/toast.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
	selector: 'app-environmental-incident-form',
	templateUrl: './environmental-incident-form.page.html',
	styleUrls: ['./environmental-incident-form.page.scss'],
})
export class EnvironmentalIncidentFormPage implements OnInit {
	public successCallback: Function = () => { };
	public errorCallback: Function = () => { };
	public base24String: any = this.photoService.base64Path('');
	datepipe: DatePipe = new DatePipe('en-US');
	date: any = new Date();
	longitude: any;
	latitude: any;
	watershed: string;
	description: string;
	additional_details: string = "";
	incidentPhotos: incidentPhoto[] = [];
	key: number = 0 || new Date().getTime();
	indexOfIncidentSetting: any;
	category: any;
	isLoading: boolean = false;
	icon: string;
	id: number;
	category_id: number;
	incident_type: any[];
	label: string;
	label_fil: string;
	barangay: string;
	sitio: string;
	selectedIncidentType: number | null = null;

	current_patrol: CurrentPatrol;
  
	constructor(
		private modalController: ModalController,
		private photoService: PhotoService,
		private incidentService: IncidentService,
		private userService: UserService,
		private currentPatrolService: CurrentPatrolService,
		private httpService: HttpService,
		private toastService: ToastService,
		private alertController: AlertController,
	) {
		this.currentPatrolService.patrol.subscribe((res: any) => {
			this.current_patrol = res;
		})
	}

	ngOnInit() { }
	

	OnChange(event) {
		console.log(event.target.value);
	}


	hideModal() {
		this.modalController.dismiss();
		this.errorCallback();
	}


	async takeAndAddPhoto() {
		const photos: incidentPhoto = await this.photoService.addNewIncidentPhoto(this.key, this.category);
		if (photos) { this.incidentPhotos.push(photos); }
	};


	async saveIncidentAndSendRequest() {
		const environmentalIncident = this.createEnvironmentalIncident(this.latitude, this.longitude, this.selectedIncidentType);
		console.log('environmentalIncident', environmentalIncident);
	
		if (environmentalIncident) {
			this.incidentService.addIncident(environmentalIncident);
			this.modalController.dismiss();
			this.toastService.presentToast('Environment Incident', 'Initialize Complete', 'bottom', 'success', 'checkbox');
		}
	}

	createEnvironmentalIncident(latitude: any, longitude: any, incidentType: any) {
		const user_id = this.userService.user.value.id;
		return {
			id: this.id,
			user_id: user_id,
			date_time: this.datepipe.transform(this.date, 'YYYY-MM-dd HH:mm:ss'),
			longitude: longitude,
			latitude: latitude,
			watershed: this.current_patrol.watershed,
			incident: this.category_id,
			incident_type: incidentType,
			barangay: this.current_patrol.barangay,
			sitio: this.current_patrol.sitio,
			description: this.description,
			additional_details: this.additional_details,
			photos: this.incidentPhotos,
		};
	}


	submitIncidentToServer(environmentalIncident: any) {
		const accessToken = this.userService.user.value.access_token;
		const endpoint = `environmental-incident/submit?access-token=${accessToken}`;

		this.httpService.postIncident(endpoint, environmentalIncident).subscribe(
			(response) => {
				console.log('Incident submitted successfully:', response);
				this.toastService.presentToast('Sync Patrol', "Send Successfully", "bottom", "success", "checkmark-circle");
			},
			(error) => {
				console.error('Error submitting incident:', error);
				this.toastService.presentToast('Sync Patrol',"Error submitting incident", "bottom", "danger", "close-circle");
			}
		);

	}

	postEnvironmentalIncident(value: any) {
		const { access_token } = this.userService.user.value
		return this.httpService.postIncident('/environmental-incident/submit?access-token=' + access_token, value);
	}

	deletePhoto(key: number) {
		if (this.incidentPhotos.length) {
			this.incidentPhotos.splice(key, 1);
		}
		return this.incidentPhotos;
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
						this.hideModal();
					},
				},
				{
					text: 'Yes',
					role: 'confirm',
					handler: () => {
						this.saveIncidentAndSendRequest();
					},
				},
			],
		})

		await alert.present()
	}

}