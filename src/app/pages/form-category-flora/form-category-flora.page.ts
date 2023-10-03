import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/storage/settings.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FloraSetting } from 'src/app/types/live.type';
import { FormCaptureFloraPage } from '../form-capture-flora/form-capture-flora.page';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
	selector: 'app-form-category-flora',
	templateUrl: './form-category-flora.page.html',
	styleUrls: ['./form-category-flora.page.scss'],
})
export class FormCategoryFloraPage implements OnInit {

	floras: FloraSetting[] = [];  
	longitude: any;
	latitude: any;
	FloraIcon: {id: number, icon: string}[] = [
		{id: 1, icon: "/assets/icon/flora/epiphytes.png"},
		{id: 2, icon: "/assets/icon/flora/ferns.png"},
		{id: 3, icon: "/assets/icon/flora/grass.png"},
		{id: 4, icon: "/assets/icon/flora/herbs.png"},
		{id: 5, icon: "/assets/icon/flora/trees.png"},
		{id: 6, icon: "/assets/icon/flora/vines.png"},
		{id: 7, icon: "/assets/icon/flora/palms.png"},
		{id: 8, icon: "/assets/icon/flora/shrubs.png"},
		{id: 99, icon: "/assets/icon/flora/others.png"}
	];

	constructor(
		private storageService		: StorageService,
		private modalController		: ModalController
	) {
		this.storageService.get(AuthConstants.SETTINGS).then(setting => {
			const settingFlora: any = setting.floras;
			if (settingFlora) {
				this.floras = settingFlora;
			}
		})
	}

	ngOnInit() {
	}

	async selectFloraCategory(id: number, category_name: string) {
		const modal = await this.modalController.create({
			component: FormCaptureFloraPage,
			componentProps: {
				key: new Date().getTime(),
				longitude: this.longitude,
				latitude: this.latitude,
				category_id: id,
				category_name: category_name
			}
		})

		modal.present()
	}
	
	modalDismiss() {
		return this.modalController.dismiss();
	}

	filteredFloraIcon(id: number) {
		return this.FloraIcon.find(flora => flora.id == id);
	}
}
