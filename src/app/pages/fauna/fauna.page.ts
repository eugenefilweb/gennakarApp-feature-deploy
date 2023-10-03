import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-fauna',
	templateUrl: './fauna.page.html',
	styleUrls: ['./fauna.page.scss'],
})
export class FaunaPage implements OnInit {

	currentForm: string = 'generalFauna';

	constructor() { }

	ngOnInit() {
	}

	handleRefresh(event: any) {
		setTimeout(() => {
			// Any calls to load data go here
			event.target.complete();
		}, 2000);
	};

	segmentChanged(event: any) {
		this.currentForm = event.target.value;
	}
}
