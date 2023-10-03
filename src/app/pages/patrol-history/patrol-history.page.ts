import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

import { AlertController, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PatrolHistoryDetailsPage } from '../patrol-history-details/patrol-history-details.page';
import { FloraService } from 'src/app/services/flora.service';
import { NetworkService } from 'src/app/services/network.service';
import { PatrolsService } from 'src/app/services/storage/patrols.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Coordinate, CurrentPatrol, EnvironmentalIncident, Fauna, Flora, Network, Patrol } from 'src/app/types/general.type';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/storage/user.service';
import { DataProviderMeta, LivePatrol, User } from 'src/app/types/live.type';
import { IncidentService } from 'src/app/services/storage/incident.service';
@Component({
	selector: 'app-patrol-history',
	templateUrl: './patrol-history.page.html',
	styleUrls: ['./patrol-history.page.scss'],
})
export class PatrolHistoryPage implements OnInit {
	currentSegment: string = 'flora';
	livePatrols: LivePatrol[] = [];
	offlinePatrols: Patrol[] = [];
	message: string = '';
	selectedOption: string = 'pending';

	currentPage: number = 1;
	pageCount: number = 1;
	perPage: number = 20;
	totalCount: number = 0;

	status: number = 0;

	currentPatrol: CurrentPatrol;
	coordinates: Coordinate[] = [];
	floras: Flora[] = [];
	faunas: Fauna[] = [];
	incidents: EnvironmentalIncident[] = [];
	network: Network;
	totalDistance: number = 0;

	progress: number = 0;
	buffer: number = 0.06;
	showProgress: boolean = false;


	constructor(
		private _http: HttpService,
		private _loading: LoadingController,
		private _modal: ModalController,
		private _flora: FloraService,
		private _network: NetworkService,
		private _patrols: PatrolsService,
		private _currentPatrol: CurrentPatrolService,
		private _general: GeneralService,
		private _user: UserService,
		private _alert: AlertController,
		private _incident: IncidentService

	) {
		this._incident.incident.subscribe((incident: EnvironmentalIncident[]) => {
			this.incidents = incident || [];
		})

		this._patrols.patrols.subscribe((patrols: Patrol[]) => {
			this.offlinePatrols = patrols || [];
		});

		this._currentPatrol.coordinates.subscribe((coordinates: Coordinate[]) => {
			this.coordinates = coordinates || [];

			this.totalDistance = this._general.totalDistance(coordinates);
		});

		this._currentPatrol.floras.subscribe((floras: Flora[]) => {
			this.floras = floras || [];
		});

		this._currentPatrol.faunas.subscribe((faunas: Fauna[]) => {
			this.faunas = faunas || [];
		});

		this._currentPatrol.patrol.subscribe((patrol: CurrentPatrol) => {
			this.currentPatrol = patrol || this._currentPatrol.INIT_DATA;
		});

		this._network.network.subscribe((network: Network) => {
			this.network = network;
			this.message = network.connected ? '' : 'No Internet';
		});
		setInterval(() => {
			this.buffer += 0.06;
			this.progress += 0.06;

			// Reset the progress bar when it reaches 100%
			// to continuously show the demo
			if (this.progress > 1) {
				setTimeout(() => {
					this.buffer = 0.06;
					this.progress = 0;
				}, 1000);
			}
		}, 1000);
	}

	ngOnInit() {
	}

	formatDate(milliseconds: number, format:string): string {
        return this._general.formatDate(milliseconds,format);
    }

	formatDateTime(milliseconds: number): string {
		return this._general.formatDateTime(milliseconds);
	}

	formatMilliseconds(milliseconds: number): string | number {
		return this._general.formatMilliseconds(milliseconds);
	}

	changeOption(event: any) {
		switch (event.target.value) {
			case 'for-validation':
				this.status = 0;
				this.showLoading();
				break;
			case 'validated':
				this.status = 1;
				this.showLoading();
				break;
			default:
				this.message = '';
				break;
		}
	}

	getPatrols(callback: Function = (() => { }), page: number = 1) {
		this.message = 'Loading...';
		const { access_token, id }: User = this._user.user.value;

		this._http.get('patrol', {
			"access-token": access_token,
			"user_id": id,
			"page": page,
			"status": this.status,
			"sort": "-created_at"
		})
			.subscribe((res: any) => {
				if (res && res.status) {
					let { patrol, _meta }: { patrol: LivePatrol[], _meta: DataProviderMeta } = res.data;
					if (page > 1) {
						const data: LivePatrol[] = this.livePatrols.concat(patrol);
						this.livePatrols = data;
					}
					else {
						this.livePatrols = patrol;
						if (patrol.length > 0) {
							this.message = '';
						}
						else {
							this.message = this.selectedOption != 'pending' ? 'No data found' : '';
						}
					}
					this.setMetaData(_meta)
				}

				callback();
			},
				(error: any) => {
					this.message = error.message;
					callback();
				})
	}

	setMetaData({ currentPage, totalCount, perPage, pageCount }: DataProviderMeta) {
		this.currentPage = currentPage;
		this.totalCount = totalCount;
		this.perPage = perPage;
		this.pageCount = pageCount;
	}

	showSwipeLoading(): boolean {
		return this.currentPage < this.pageCount;
	}

	loadData(event: any) {
		if (this.currentPage < this.pageCount) {
			this.getPatrols(() => {
				event.target.complete();
			}, this.currentPage + 1);
		} else {
			event.target.disabled = true;
		}
	}

	async showLoading() {
		const network: Network = await this._network.getNetwork();

		if (network.connected) {
			const loading: any = await this._loading.create({
				spinner: 'circles',
			});

			loading.present();

			this.getPatrols(() => { this._loading.dismiss() });
		}
		else {
			this.message = this.selectedOption != 'pending' ? 'No internet' : '';
		}
	}

	handleRefresh(event: any) {
		this.showLoading();
		event.target.complete();
	}

	segmentChanged(event: any) {
		this.currentSegment = event.target.value;
	}

	async modalDetails(params: any) {
		const modal: any = await this._modal.create({
			cssClass: "modal-fullscreen",
			component: PatrolHistoryDetailsPage,
			componentProps: params
		});

		return modal.present();
	}

	travelHours(patrol: Patrol): string | number {
		let time: number = patrol.lastTimestamp - patrol.timestamp;

		if (patrol.syncStatus == 'Ongoing') {
			time = (new Date().getTime()) - patrol.timestamp;
		}

		return this._general.formatMilliseconds(time);
	}

	viewDetails(patrol: Patrol, isCurrentPatrol: boolean = false) {
		this.modalDetails({
			tripId: patrol.timestamp,
			watershed: patrol.watershed,
			createdAt: this.formatDate(patrol.timestamp, 'll'),
			// createdAt: this._general.formatDateTime(patrol.timestamp),
			floras: patrol.floras,
			faunas: patrol.faunas,
			distance: patrol.distance,
			travelHours: isCurrentPatrol ? this._general.formatMilliseconds((new Date().getTime()) - patrol.timestamp) : this._general.formatMilliseconds(patrol.lastTimestamp - patrol.timestamp),
			coordinates: patrol.coordinates,
			statusLabel: patrol.syncStatus,
			statusClass: patrol.syncStatus,
			isCurrentPatrol,
			type: 'offline',
		});
	}

	viewLivePatrol(patrol: LivePatrol) {
		const param = JSON.parse(JSON.stringify(patrol));
		param.type = 'online';

		this.modalDetails(param);
	}

	postPatrolForm() {
		this.showProgress = true;
		this._flora.submitPatrolForm().subscribe((data: any) => {
			this.showProgress = false;
			if (data.status) {
				if (data.data.error) {
					this.alertMessage({
						header: 'Sync Failed!',
						message: data.data.message || 'Something went wrong'
					});
				}
				else {
					this.alertMessage({
						header: 'Sync Success',
						message: 'Data saved to the server.',
					});
					setTimeout(() => {
						this._patrols.set([]);
					}, 1.500);
				}
			}
		}, (error: any) => {
			this.showProgress = false;
			this.alertMessage({
				header: 'Sync Failed!',
				message: 'Something went wrong'
			});
		});
	}
	async alertSyncFlora() {
		const alert = await this._alert.create({
			header: 'Sync Patrols?',
			message: 'All pending patrol will be sent to server.',
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
						this._patrols.changeSyncStatus(() => {
							this.postPatrolForm();
						});
					},
				},
			],
		})
		return alert.present();
	}

	async initLoading() {
		const loading = await this._loading.create({
			spinner: "circles"
		})
		return loading.present();
	}

	async alertMessage({ header, message }) {
		const alert: any = await this._alert.create({
			header,
			message,
			cssClass: 'custom-alertSync',
			buttons: [
				{
					text: 'OK',
					role: 'confirm',
				},
			],
		})
		return alert.present();
	}

	getBadgeColor(syncStatus: string): string {
		switch (syncStatus) {
			case 'Ongoing':
				return 'progress';
			case 'Pending':
				return 'pending';
			case 'Syncing':
				return 'pending';
			default:
				return 'primary'; // You can change this default color as needed
		}
	}
}
