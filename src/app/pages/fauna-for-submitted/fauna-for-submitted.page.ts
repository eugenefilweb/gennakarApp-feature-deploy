import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PhotoService } from 'src/app/services/photo.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Fauna } from 'src/app/types/general.type';
import { FaunaForSubmittedViewPage } from '../fauna-for-submitted-view/fauna-for-submitted-view.page';

@Component({
  selector: 'app-fauna-for-submitted',
  templateUrl: './fauna-for-submitted.page.html',
  styleUrls: ['./fauna-for-submitted.page.scss'],
})
export class FaunaForSubmittedPage implements OnInit {

	faunaSubmitted: string;	

	faunas: Fauna[] = [];
	faunaStorage = AuthConstants;
	constructor(
		private _modal: ModalController,
		private _photo: PhotoService,
		private _currentPatrol: CurrentPatrolService,
	) {
		this._currentPatrol.faunas.subscribe((faunas: Fauna[]) => {
			this.faunas = faunas || [];
		});
	}

	ngOnInit() { };

	removeFaunaItem(key: number) {
			// this._currentPatrol.remove(key);
	}
	
	handleRefresh(event: any) {
		setTimeout(() => {
			event.target.complete();
		}, 500);
	}
	
	async forSubmittedView(appId: number) {
		const modal: any = await this._modal.create({
			cssClass: "modal-fullscreen",
			component: FaunaForSubmittedViewPage,
			componentProps: { appId }
		})
		modal.present()
	}

	addForm(selectCategory: string) {
			this._currentPatrol.addForm(selectCategory);
	}

	imageSrc(fauna: Fauna): string {
		return fauna.photos[0] ? (this._photo.base64Path(fauna.photos[0].base64string) || AuthConstants.DEFAULT_IMAGE) : AuthConstants.DEFAULT_IMAGE;
	}
}
