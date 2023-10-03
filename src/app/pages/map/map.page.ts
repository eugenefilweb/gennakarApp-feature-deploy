import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { PatrolsService } from 'src/app/services/storage/patrols.service';
import { CurrentPatrol, Flora, Patrol } from 'src/app/types/general.type';
@Component({
	selector: 'app-map',
	templateUrl: './map.page.html',
	styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {

	treesTrack: string = '0';
	animalsTrack: string = '0';

	currentPatrol: CurrentPatrol;
	patrols: Patrol[] = [];

	constructor(
		private modalController: ModalController,
		private location: Location,
		public _router: Router,
		private _currentPatrol: CurrentPatrolService,
		private _patrols: PatrolsService
	) {
		this._currentPatrol.patrol.subscribe((patrol: CurrentPatrol) => {
			this.currentPatrol = patrol || this._currentPatrol.INIT_DATA;
		});

		this._patrols.patrols.subscribe((patrols: Patrol[]) => {
			this.patrols = patrols || [];
		});

		this._currentPatrol.floras.subscribe((floras: Flora[]) => {
			const num: number = floras && floras.length;
			this.treesTrack = num.toLocaleString('en-US');
		});
	}

	ngOnInit() { }

	enabledMapFeature() {
		if (!this.currentPatrol.status) {
			this._currentPatrol.selectWatershed();
		}
		else {
			this._currentPatrol.end(() => {
				this._router.navigate(['/tabs/patrol-history']);
			});
		}
	}



	dismiss() {
		return this.modalController.dismiss();
	}
}