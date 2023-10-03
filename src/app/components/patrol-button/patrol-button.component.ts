import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PatrolHistoryDetailsPage } from 'src/app/pages/patrol-history-details/patrol-history-details.page';
import { GeneralService } from 'src/app/services/general.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { CurrentPatrol } from 'src/app/types/general.type';

@Component({
	selector: 'app-patrol-button',
	templateUrl: './patrol-button.component.html',
	styleUrls: ['./patrol-button.component.scss'],
})
export class PatrolButtonComponent implements OnInit {

	public current_patrol: CurrentPatrol;

	constructor(
		private _currentPatrol: CurrentPatrolService,
		private _modal: ModalController,
		private _general: GeneralService,
	) {
		this._currentPatrol.patrol.subscribe((patrol: CurrentPatrol) => {
			this.current_patrol = patrol;
		});
	}

	ngOnInit() { }

	async modalDetails(params: any) {
		const modal: any = await this._modal.create({
			cssClass: "modal-fullscreen",
			component: PatrolHistoryDetailsPage,
			componentProps: params
		});

		modal.present();
	}

	async viewDetails(patrol: CurrentPatrol) {
		this.modalDetails({
			tripId: patrol.timestamp,
			watershed: patrol.watershed,
			createdAt: this._general.formatDateTime(patrol.timestamp),
			floras: patrol.floras,
			faunas: patrol.faunas,
			totalDistance: patrol.distance,
			travelHours: this._general.formatMilliseconds((new Date().getTime()) - patrol.timestamp),
			coordinates: patrol.coordinates,
			statusLabel: patrol.syncStatus,
			statusClass: patrol.syncStatus == 'Ongoing' ? 'primary' : 'warning',
			isCurrentPatrol: true
		});
	}
}