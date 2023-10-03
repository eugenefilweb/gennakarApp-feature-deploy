import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthConstants } from 'src/app/config/auth-constants';
import { FormFloraPage } from 'src/app/pages/form-flora/form-flora.page';
import { SelectWatershedPage } from 'src/app/pages/modals/select-watershed/select-watershed.page';
import { Coordinate, CurrentPatrol, Fauna, Flora, Form, Patrol } from 'src/app/types/general.type';
import { GeneralService } from '../general.service';
import { PatrolsService } from './patrols.service';
import { StorageService } from './storage.service';
import { LocationPickerPage } from 'src/app/pages/location-picker/location-picker.page';
import { FormCategoryFloraPage } from 'src/app/pages/form-category-flora/form-category-flora.page';
import { FormCaptureFaunaPage } from 'src/app/pages/form-capture-fauna/form-capture-fauna.page';
import { FormCategoryFaunaPage } from 'src/app/pages/form-category-fauna/form-category-fauna.page';
import { EnvironmentalIncidentModalPage } from 'src/app/pages/modals/environmental-incident-modal/environmental-incident-modal.page';

@Injectable({
	providedIn: 'root'
})
export class CurrentPatrolService {
	patrolName: string = AuthConstants.CURRENT_PATROL;
	florasName: string = AuthConstants.FLORAS;
	faunasName: string = AuthConstants.FAUNAS;
	coordinatesName: string = AuthConstants.COORDINATES;


	INIT_DATA: CurrentPatrol = {
		status: false,
		timestamp: 0,
		lastTimestamp: 0,
		watershed: '',
		notes: '',
		distance: 0,
		floras: [],
		faunas: [],
		coordinates: [],
		barangay: '',
		sitio: '',
		totalTime: 0,
		syncStatus: '',
	}

	faunas: BehaviorSubject<Fauna[]> = new BehaviorSubject([]);
	floras: BehaviorSubject<Flora[]> = new BehaviorSubject([]);
	coordinates: BehaviorSubject<Coordinate[]> = new BehaviorSubject([]);
	patrol: BehaviorSubject<CurrentPatrol> = new BehaviorSubject(this.INIT_DATA);
	patrolTimestamp: BehaviorSubject<string> = new BehaviorSubject('');

	/**
	 * 
	 * @param _storage 
	 * @param _alert 
	 * @param _patrols 
	 * @param _modal 
	 * @param _general 
	 * @param _loading 
	 */
	constructor(
		private _storage: StorageService,
		private _alert: AlertController,
		private _patrols: PatrolsService,
		private _modal: ModalController,
		private _general: GeneralService,
		private _loading: LoadingController,
	) {
		this.init();
	}


	/**
	 * set patrol if status is true
	 */
	private setPatrolTimestamp() {
		const { timestamp, status }: Patrol = this.patrol.value;
		if (status) {
			this.patrolTimestamp.next(this._general.convertTime(Math.ceil(((new Date().getTime()) - timestamp) / 1000)));
		} else {
			this.patrolTimestamp.next('');
		}
	}

	/**
	 * 
	 * @param successCallback 
	 * @param cancelCallback 
	 */
	private async endPatrolConfirmation(successCallback: Function = (() => { }), cancelCallback: Function = (() => { })) {
		const alert: any = await this._alert.create({
			header: 'End Patrol?',
			message: 'All encoded data will be saved locally.',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						cancelCallback();
					},
				},
				{
					text: 'End',
					role: 'confirm',
					handler: () => {
						successCallback();
					},
				},
			],
		});
		await alert.present();
	}

	/**
	 * 	Starts patrol monitoring if status is true.
	 */
	triggerPatrol() {
		const { status }: Patrol = this.patrol.value;
		if (status) {
			setInterval(() => {
				this.setPatrolTimestamp();
			}, 1000);
		}
	}

	/**
	 * 
	 * @param callback 
	 * @returns 
	 */
	async resetData(callback: Function = (() => { })): Promise<Object> {
		const patrol: CurrentPatrol = await this._storage.set(this.patrolName, this.INIT_DATA);
		const floras: Flora[] = await this._storage.set(this.florasName, []);
		const faunas: Fauna[] = await this._storage.set(this.faunasName, []);
		const coordinates: Coordinate[] = await this._storage.set(this.coordinatesName, []);

		this.patrol.next(patrol);
		this.floras.next(floras);
		this.faunas.next(faunas);
		this.coordinates.next(coordinates);

		const data: Object = { patrol, floras, faunas, coordinates }
		callback(data);
		return data;
	}

	/**
	 * 
	 * @param callback 
	 */
	async init(callback: Function = (() => { })) {
		const patrol: CurrentPatrol = await this._storage.get(this.patrolName);

		if (!patrol) {
			await this.resetData(callback);
		}
		else {
			const floras: Flora[] = await this._storage.get(this.florasName) || [];
			const faunas: Fauna[] = await this._storage.get(this.faunasName) || [];
			const coordinates: Coordinate[] = await this._storage.get(this.coordinatesName) || [];

			this.patrol.next(patrol);
			this.floras.next(floras);
			this.faunas.next(faunas);
			this.coordinates.next(coordinates);

			const data: Object = {
				patrol,
				floras,
				faunas,
				coordinates,
			}
			callback(data);
		}
		this.triggerPatrol();
	}

	async addFlora(flora: Flora, callback: Function = (() => { })) {
		let floras: Flora[] = await this._storage.get(this.florasName) || [];
		floras.push(flora);

		await this._storage.set(this.florasName, floras);
		this.floras.next(floras);

		callback(floras);
	}

	async add(form: Form, storageName: string, callback: Function = (() => { })) {
		let forms: Form[] = await this._storage.get(storageName) || [];
		forms.push(form);

		await this._storage.set(storageName, forms);
		this.floras.next(forms);

		callback(forms);
	}

	async updateFlora(appId: number | string, flora: Flora, callback: Function = (() => { })) {
		let floras: Flora[] = await this._storage.get(this.florasName) || [];
		if (floras.length) {
			const index: number = floras.findIndex((f: Flora) => f.appId == appId);

			floras[index] = flora;

			await this._storage.set(this.florasName, floras);
			this.floras.next(floras);
		}

		callback({ floras, flora, appId });
	}

	async removeFlora(key: number, callback: Function = (() => { })) {
		let floras: Flora[] = await this._storage.get(this.florasName) || [];

		if (floras.length) {
			floras.splice(key, 1);
		}

		await this._storage.set(this.florasName, floras);
		this.floras.next(floras);
		callback(floras);
	}

	async remove(key: number, form: BehaviorSubject<Form[]>, storage: string, callback: Function = (() => { })) {
		let forms: Form[] = await this._storage.get(storage) || [];

		if (forms.length) {
			forms.splice(key, 1)
		}

		await this._storage.set(storage, forms);
		form.next(forms);
		callback(forms);
	}

	async end(successCallback: Function = (() => { }), cancelCallback: Function = (() => { })) {
		let patrol: CurrentPatrol = await this._storage.get(this.patrolName);
		const floras: Flora[] = await this._storage.get(this.florasName);
		const faunas: Fauna[] = await this._storage.get(this.faunasName);
		const coordinates: Coordinate[] = await this._storage.get(this.coordinatesName);
		const distance: number = this._general.totalDistance(coordinates);

		this.endPatrolConfirmation(() => {
			patrol.floras = floras;
			patrol.faunas = faunas;
			patrol.coordinates = coordinates;
			patrol.distance = distance;
			this._patrols.addPatrol(patrol, async (patrols: Patrol[]) => {
				await this.resetData();
				this.triggerPatrol();

				successCallback({ patrol, resetData: this.INIT_DATA, patrols });
			});
		}, cancelCallback)
	}

	/**
	 * 
	 * @param patrol 
	 * @param watershed 
	 * @param barangay 
	 * @param sitio 
	 * @param callback 
	 */
	async start(patrol: Patrol | any = '', watershed: string = '', barangay: string = '', sitio: string = '', callback: Function = (() => { })) {
		patrol = patrol || await this._storage.get(this.patrolName);
		patrol.status = true;
		patrol.syncStatus = 'Ongoing';
		patrol.barangay = barangay || patrol.barangay;
		patrol.sitio = sitio || patrol.sitio;
		patrol.watershed = watershed || patrol.watershed;
		patrol.timestamp = new Date().getTime();

		await this._storage.set(this.patrolName, patrol);
		this.patrol.next(patrol);
		this.triggerPatrol();
		callback(patrol);
	}

	/**
	 * 
	 * @param startCallback 
	 * @param endCallback 
	 */
	async toggle(startCallback: Function = (() => { }), endCallback: Function = (() => { })) {
		let patrol: CurrentPatrol = await this._storage.get(this.patrolName);

		if (patrol.status) {
			this.end();
			startCallback(patrol)
		}
		else {
			this.start(patrol)
			endCallback(patrol)
		}
	}

	/**
	 * 
	 * @param coordinate 
	 * @param callback 
	 */
	async addCoordinate(coordinate: Coordinate, callback: Function = (() => { })) {
		let coordinates: Coordinate[] = await this._storage.get(this.coordinatesName) || [];

		coordinates.push(coordinate);

		await this._storage.set(this.coordinatesName, coordinates);

		this.coordinates.next(coordinates);
		callback(coordinates);
	}

	/**
	 * 	Display Location Picker page after choosing the watershed
	 */
	async selectWatershed() {
		const modal: any = await this._modal.create({
			cssClass: "modal-fullscreen",
			component: LocationPickerPage,
			// componentProps: {
			//   successCallback: () => {
			//     this.modalForm();
			//   }
			// }
		});
		await modal.present();
	}

	/**
	 * 
	 * @param selectedCategory 
	 */
	async modalForm(selectedCategory: string) {
		const loading: any = await this._loading.create({
			spinner: 'circles',
			message: 'Getting location'
		});
		loading.present();

		this._general.getPosition(async (position: GeolocationPosition) => {
			this._loading.dismiss();

			let component: any;

			if (selectedCategory == 'floras') {
				component = FormCategoryFloraPage;
			} else if (selectedCategory == 'faunas') {
				component = FormCategoryFaunaPage;
			} else if (selectedCategory == 'incident') {
				component = EnvironmentalIncidentModalPage;
			} else {

			}

			const { latitude, longitude }: GeolocationCoordinates = position.coords;

			const modal = await this._modal.create({
				cssClass: "modal-fullscreen",
				component: component,
				componentProps: {
					key: new Date().getTime(),
					longitude: longitude,
					latitude: latitude,
				}
			});
			modal.present();
		}, (error: any) => {
			this._loading.dismiss();

		});
	}

	/**
	 * 
	 * @param selectedCategory 
	 */
	addForm(selectedCategory: string) {
		const { status }: Patrol = this.patrol.value;
		if (status) {
			this.modalForm(selectedCategory);
		}
		else {
			this.selectWatershed();
		}
	}
}
