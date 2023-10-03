import { Component, OnInit } from '@angular/core';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Coordinate } from 'src/app/types/general.type';

@Component({
	selector: 'app-coordinates',
	templateUrl: './coordinates.page.html',
	styleUrls: ['./coordinates.page.scss'],
})
export class CoordinatesPage implements OnInit {
	coordinates: Coordinate[] = [];

	constructor(
		private _currentPatrol: CurrentPatrolService,
	) {
		this._currentPatrol.coordinates.subscribe((coordinates: Coordinate[]) => {
			this.coordinates = coordinates || [];
		});
	}

	ngOnInit() {
	}

	readableTimestamp(unixtime: number): string {
		var newDate = new Date();
		newDate.setTime(unixtime);
		return newDate.toLocaleString();
	}

	handleRefresh(event: any) {
		event.target.complete();
	}

	totalCoordinates(): string {
		let total: number = this.coordinates.length || 0;

		return total.toLocaleString();
	}
}
