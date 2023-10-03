import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/storage/settings.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FaunaSetting } from 'src/app/types/live.type';
import { FormCaptureFaunaPage } from '../form-capture-fauna/form-capture-fauna.page';
import { AuthConstants } from 'src/app/config/auth-constants';
import { NetworkService } from 'src/app/services/network.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-form-category-fauna',
	templateUrl: './form-category-fauna.page.html',
	styleUrls: ['./form-category-fauna.page.scss'],
})
export class FormCategoryFaunaPage implements OnInit {

	faunas: FaunaSetting[] = [];  
	longitude: any;
	latitude: any;
	FaunaIcon: {id:number, icon: string}[] = [
		{id: 1, icon: "/assets/icon/fauna/fish.png"},
		{id: 2, icon: "/assets/icon/fauna/arthropods.png"},
		{id: 3, icon: "/assets/icon/fauna/birds.png"},
		{id: 4, icon: "/assets/icon/fauna/amphibians.png"},
		{id: 5, icon: "/assets/icon/fauna/mammals.png"},
		{id: 6, icon: "/assets/icon/fauna/reptiles.png"},
		{id: 99, icon: "/assets/icon/fauna/others.png"}
	]
	constructor(
		private settingService: SettingsService,
		private storageService: StorageService,
		private modalController: ModalController,
		private sanitizer: DomSanitizer
	) {

		this.storageService.get(AuthConstants.SETTINGS).then(setting => {
			const faunas: any = setting.faunas;
			if (faunas) {
				this.faunas = faunas;
			}
		})
	}

	ngOnInit() {
		
	}

	modalDismiss() {
		return this.modalController.dismiss();
	}

	asset(path: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(path);
	}

	async selectFaunaCategory(id: number, category_name: string) {
		const modal = await this.modalController.create({
			component: FormCaptureFaunaPage,
			componentProps: {
				key: new Date().getTime(),
				longitude: this.longitude,
				latitude: this.latitude,
				category_id: id,
				category_name: category_name
			}
		})
		
		await modal.present()
	}

	filteredFaunaIcon(id: number) {
		return this.FaunaIcon.find(fauna => fauna.id == id);
	}
}
