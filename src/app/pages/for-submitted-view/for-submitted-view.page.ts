import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade, EffectCube } from 'swiper';
import { IonicSlides, LoadingController, ToastController, } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { DatePipe } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Flora, Photo } from 'src/app/types/general.type';
import { GeneralService } from 'src/app/services/general.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade, IonicSlides, EffectCube]);

@Component({
	selector: 'app-for-submitted-view',
	templateUrl: './for-submitted-view.page.html',
	styleUrls: ['./for-submitted-view.page.scss'],
})
export class ForSubmittedViewPage implements OnInit {
	datepipe: DatePipe = new DatePipe('en-US');
	barangay: string;
	sitio: string;
	longitude: number;
	latitude: number;
	date: string;
	taxonomic_group: string;
	key: any;
	appId: number;
	id: number | null;

	constructor(
		public _photo: PhotoService,
		private _modal: ModalController,
		private _actionSheet: ActionSheetController,
		private _loading: LoadingController,
		private _toast: ToastController,
		private _currentPatrol: CurrentPatrolService,
		private _general: GeneralService,
	) {
	}

	ngOnInit() {
		const floras: Flora[] = this._currentPatrol.floras.value;
		if (floras.length) {
			const flora: Flora = floras.find((f: Flora) => f.appId == this.appId);
			if (flora && this._general.objectNotEmpty(flora)) {
				// this.common_name = flora.common_name || '';
				// this.description = flora.description || '';
				// this.kingdom = flora.kingdom || '';
				// this.family = flora.family || '';
				// this.genus = flora.genus || '';
				// this.species = flora.species || '';
				// this.sub_species = flora.sub_species || '';
				// this.taxonomic_group = flora.taxonomic_group || '';
				// this.varieta_and_infra_var_name = flora.varieta_and_infra_var_name || '';
				// Category of photos
				// this.fullheight = Array.from(flora.fullheight || []);
				// this.immediate_vicinity = Array.from(flora.immediate_vicinity || []);
				// this.leaves = Array.from(flora.leaves || []);
				// this.trunk = Array.from(flora.trunk || []);
				// this.fruit = Array.from(flora.fruit || []);
				// this.roots = Array.from(flora.roots || []);
				// this.west_left = Array.from(flora.west_left || []);
				// this.east_right = Array.from(flora.east_right || []);
			}
		}
	}

	private _deleteImage(photos: Photo[], key: number): Photo[] {
		photos.splice(key, 1);
		return photos;
	}

	deleteImage = async (photo: Photo, key: number) => {
		const actionSheet: any = await this._actionSheet.create({
			header: 'Delete Image',
			subHeader: 'Are you sure you want to delete this image ?',
			mode: 'md',
			cssClass: 'custom-actionsheet-controller',
			buttons: [
				{
					text: 'Delete',
					role: 'destructive',
					handler: () => {
						switch (photo.category) {
							// case 'fullheight': this.fullheight = this._deleteImage(this.fullheight, key); break;
							// case 'immediate_vicinity': this.immediate_vicinity = this._deleteImage(this.immediate_vicinity, key); break;
							// case 'leaves': this.leaves = this._deleteImage(this.leaves, key); break;
							// case 'fruit': this.fruit = this._deleteImage(this.fruit, key); break;
							// case 'trunk': this.trunk = this._deleteImage(this.trunk, key); break;
							// case 'roots': this.roots = this._deleteImage(this.roots, key); break;
							// case 'west_left': this.west_left = this._deleteImage(this.west_left, key); break;
							// case 'east_right': this.east_right = this._deleteImage(this.east_right, key); break;
							default:
								break;
						}
					},
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						// console.log('Cancel clicked');
					},
				},
			],
		});
		await actionSheet.present();
	}

	modalDismiss = () => {
		this._modal.dismiss();
	};

	updatePhotoToGallery = async (category: string) => {
		const photo: Photo = await this._photo.updateNewToGallery(this.appId, category);

		if (photo && this._general.objectNotEmpty(photo)) {
			switch (category) {
				// case 'fullheight': this.fullheight.push(photo); break;
				// case 'immediate_vicinity': this.immediate_vicinity.push(photo); break;
				// case 'leaves': this.leaves.push(photo); break;
				// case 'fruit': this.fruit.push(photo); break;
				// case 'trunk': this.trunk.push(photo); break;
				// case 'roots': this.roots.push(photo); break;
				// case 'west_left': this.west_left.push(photo); break;
				// case 'east_right': this.east_right.push(photo); break;
				default:
					break;
			}
		}
	}

	// nagivatePhoto() {
	// 	this.currentSegment = 'pictureFlora'
	// }

	// updateGeneralForm() {
	// 	const date_encoded: string = this.datepipe.transform(this.date, 'YYYY-MMM-dd HH:mm:ss');
	// 	this._currentPatrol.updateFlora(this.appId, {
	// 		appId: this.appId || 0,
			// // common_name: this.common_name || '',
			// kingdom: this.kingdom || '',
			// family: this.family || '',
			// genus: this.genus || '',
			// species: this.species || '',
			// sub_species: this.sub_species || '',
			// varieta_and_infra_var_name: this.varieta_and_infra_var_name || '',
			// taxonomic_group: this.taxonomic_group || '',
			// longitude: this.longitude || 0,
			// latitude: this.latitude || 0,
			// description: this.description || '',
			// fullheight: this.fullheight || [],
			// immediate_vicinity: this.immediate_vicinity || [],
			// leaves: this.leaves || [],
			// fruit: this.fruit || [],
			// trunk: this.trunk || [],
			// roots: this.roots || [],
			// west_left: this.west_left || [],
			// east_right: this.east_right || [],
		// 	date_encoded: date_encoded || '',
		// 	barangay: this.barangay,
		// 	sitio: this.sitio
		// }, () => {
		// 	this._photo.photos = []; // initialize empty array
		// 	this.modalDismiss(); // close the modal
		// });
	// }

	async loadingData(header: string, message: string) {
		const loading: any = await this._loading.create({
			message: 'Loading data...',
		});
		await loading.present();
		try {
			const toast = await this._toast.create({
				header: header,
				message: message,
				cssClass: 'toastcustom',
				icon: 'checkmark-circle',
				mode: 'ios',
				animated: true,
				duration: 1500,
				position: 'bottom',
				color: 'success',
			});
			toast.present();
		}
		catch (err: any) {
			const toast: any = await this._toast.create({
				header: 'Failed',
				message: 'Failed to load Data',
				cssClass: 'toastcustom',
				icon: 'checkmark-circle',
				mode: 'ios',
				animated: true,
				duration: 1500,
				position: 'bottom',
				color: 'danger',
			});
			toast.present();
		} finally {
			await loading.dismiss();
		}
	}
}