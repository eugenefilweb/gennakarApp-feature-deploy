import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthConstants } from 'src/app/config/auth-constants';
import { HttpService } from 'src/app/services/http.service';
import { PhotoNewService } from 'src/app/services/photo-new.service';
import { IncidentService } from 'src/app/services/storage/incident.service';
import { SettingsService } from 'src/app/services/storage/settings.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/storage/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { EnvironmentalIncident, Flora, incidentPhoto } from 'src/app/types/general.type';
import { Settings, incidentSetting } from 'src/app/types/live.type';

@Component({
	selector: 'app-environmental-incident-report',
	templateUrl: './environmental-incident-report.page.html',
	styleUrls: ['./environmental-incident-report.page.scss'],
})
	
export class EnvironmentalIncidentReportPage implements OnInit {
	private autoSendRequests: boolean = true;


	incidentPhoto: incidentPhoto[] = [];
	label: any;
	incidentSetting: any[] = [];
	incidentData: EnvironmentalIncident[] = [];
	// incidentData:  BehaviorSubject<EnvironmentalIncident[]> = new BehaviorSubject([]);
	settings: Settings[] = [];
	constructor(
		private storageService: StorageService,
		private incidentService: IncidentService,
		private settingService: SettingsService,
		private httpService: HttpService,
		private userService: UserService,
		private alertController: AlertController,
		private photoService: PhotoNewService,
		private toastService: ToastService
	) {
		this.incidentService.incident.subscribe((res: any) => {
			const incident: any = res;
			if (incident) {
				this.incidentData = incident;
			}
		});
		
		this.settingService.settings.subscribe((res: any) => {
			this.settings = res || [];
		});
	}

	ngOnInit() { } 
	
	generateIncidentName(incidentId: any): string {
		const incidentMap: { [key: number]: string } = {
			1: "Deforestation",
			2: "Land Clearing",
			3: "Enroachment",																
			4: "Poaching",
			5: "Soil Erosion",
			6: "Illegal Forest Activity",
			7: "Pollution",
		};
		return incidentMap[incidentId] || "Others";
	}

	/**
	 * Retrieve the of incident in storage service
	 * check if there's a
	 * 
	 */
	clearIncidentStorage(index: number[]) {
		this.storageService.get(AuthConstants.INCIDENT).then(res => {
			if (res) {
				const response: any = res;
				let newFiltered = [];
				for (let i = 0; i < response.length; i++) {
					const filterResponse = response[i];
					if (filterResponse.id != index) {
						newFiltered.push(filterResponse);
					}
				}
				this.storageService.set(AuthConstants.INCIDENT, newFiltered);
			}
		})
	}
	
	delay(t, val) {
		return new Promise(resolve => setTimeout(resolve, t, val));
	}
	
	postIncidentForm() {
		this.storageService.get(AuthConstants.INCIDENT).then(data => {
			const access_token = this.userService.user.value.access_token;
			if (!data) { return; }
			const url = `environmental-incident/submit?access-token=${access_token}`;

			let arr = [];

			for (let index: number = 0; index < data.length; index++) {
				const element = data[index];
					arr[index] = this.httpService.postIncident(url, element)
					.pipe(map(
						(res) => {
							if (res) {
								this.clearIncidentStorage(element.id)
								this.clearIncidentData(element.id);
							}
							return res;
						}
					));	
				console.log(arr);
			}

			forkJoin(arr).subscribe((responses: any[]) => {
				console.log('responses', responses);
				this.incidentData = [];
			}, error => {
				console.log('error', error);
			});
		})
		// this.incidentService.incident.subscribe((data: any) => {
		// 	const access_token = this.userService.user.value.access_token;
		// 	if (!data) { return; }
		// 	const url = `environmental-incident/submit?access-token=${access_token}`;

			
			
		// 	// let completedRequests = 0; // To track completed requests
		// 	// let totalRequests = this.incidentData.length;

		// 	// for (let index = 0; index < data.length; index++) {
		// 	// 	const element = data[index];
		// 	// 	this.httpService.postIncident(url, element).subscribe((response: any) => {
		// 	// 		console.log('response.startPatrol', response.startPatrol);
					
		// 	// 		if (response.status) {
		// 	// 			if (response.data.error) {
		// 	// 				this.alertMessage('Sync Failed!', response.data.message || 'Something went wrong');
		// 	// 			} else {
		// 	// 				completedRequests++;
		// 	// 				if (completedRequests === totalRequests) {
		// 	// 					// Display the success message only when all requests are completed
		// 	// 					this.autoSendRequests = false;
		// 	// 					setTimeout(() => {
		// 	// 						this.incidentService.set([])

		// 	// 					}, 1500);
		// 	// 					this.alertMessage('Sync Success', 'Data saved to the server.');
		// 	// 				}
		// 	// 			}
		// 	// 		}
		// 	// 	});
		// 	// }

		// 	let arr = [];

		// 	for (let index: number = 0; index < data.length; index++) {
		// 		const element = data[index];
		// 			console.log('index', index);
					
		// 			arr[index] = this.httpService.postIncident(url, element)
		// 			.pipe(map(
		// 				(res) => {
		// 					if (res) {
		// 						this.clearIncidentStorage(element.id)
		// 						this.clearIncidentData(element.id);
		// 					}
		// 					return res;
		// 				}
		// 			));	
		// 		console.log(arr);
		// 	}

		// 	forkJoin(arr).subscribe((responses: any[]) => {
		// 		console.log('responses', responses);
		// 		this.incidentData = [];
		// 	}, error => {
		// 		console.log('error', error);
		// 	});
		// })
	}

	clearIncidentData(index: number) { 
		if (this.incidentData) {
			console.log('this.incidentData', this.incidentData);
		}
	}

	async showLeaveConfirmation() {
		const alert = await this.alertController.create({
			header: 'Confirmation',
			message: `Sigurado ka bang gusto mong sync ang mga entry na ito`,
			buttons: [
				{
					text: 'Hindi',
					role: 'cancel',
					handler: () => {
						
					},
				},
				{
					text: 'Oo',
					role: 'confirm',
					handler: () => {
						this.postIncidentForm();
					},
				},
			],
		})

		await alert.present()
	}


	async alertMessage(header: string, message: string) {
		const alert: any = await this.alertController.create({
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

	imageSrc(incident: EnvironmentalIncident): string {
		// console.log('incident', incident);
		return incident.photos[0] ? (this.photoService.base64Path(incident.photos[0].base64string) || AuthConstants.DEFAULT_IMAGE) : AuthConstants.DEFAULT_IMAGE;
	}
}