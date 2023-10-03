import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';

@Component({
	selector: 'app-flora',
	templateUrl: './flora.page.html',
	styleUrls: ['./flora.page.scss'],
})

export class FloraPage implements OnInit {

	flora_segment: string = 'for-submitted';

	constructor(
		private _router: Router,
		private _currentPatrol: CurrentPatrolService,

	) {

	}

	ngOnInit() { 
	}

	// ionViewDidEnter() {
	// 	if ('/tabs/flora/for-submitted/showForm' == this._router.url) {
	// 		this.addForm();
	// 	}
	// }

	handleRefresh(event: any) {
		setTimeout(() => {
			// Any calls to load data go here
			event.target.complete();
		}, 2000);
	};

	// addForm() {
	// 	this._currentPatrol.addForm();
	// }
	

}