import { Component, OnInit, } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { ForSubmittedViewPage } from '../for-submitted-view/for-submitted-view.page';
import { AuthConstants } from 'src/app/config/auth-constants';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Flora } from 'src/app/types/general.type';

@Component({
	selector: 'app-for-submitted',
	templateUrl: './for-submitted.page.html',
	styleUrls: ['./for-submitted.page.scss'],
})

export class ForSubmittedPage implements OnInit {

	floraSubmitted: string;

	floras: Flora[] = [];

	constructor(
		private _modal: ModalController,
		private _photo: PhotoService,
		private _currentPatrol: CurrentPatrolService,
	) {
		this._currentPatrol.floras.subscribe((floras: Flora[]) => {
			this.floras = floras || [];
		});
	}

	ngOnInit() {
	}

	removeFloraItem(key: number) {
		this._currentPatrol.removeFlora(key);
	}

	handleRefresh(event: any) {
		setTimeout(() => {
			event.target.complete();
		}, 500);
	}

	async forSubmittedView(appId: number) {
		const modal: any = await this._modal.create({
			cssClass: "modal-fullscreen",
			component: ForSubmittedViewPage,
			componentProps: { appId }
		})
		modal.present()
	}

	imageSrc(flora: Flora): string {
		return flora.photos[0] ? (this._photo.base64Path(flora.photos[0].base64string) || AuthConstants.DEFAULT_IMAGE) : AuthConstants.DEFAULT_IMAGE;
	}

	addForm(selectCategory: string) {
		this._currentPatrol.addForm(selectCategory);
	}
}
