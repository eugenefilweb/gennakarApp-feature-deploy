import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import * as mapboxgl from 'mapbox-gl';

@Component({
	selector: 'app-mapbox',
	templateUrl: './mapbox.page.html',
	styleUrls: ['./mapbox.page.scss'],
})
export class MapboxPage implements OnInit, AfterViewInit {
	constructor(
		private mapboxService: MapboxService
	) { }
	ngAfterViewInit() {
		this.mapboxService.initMap('map-container');
	}
	ngOnInit() {
	}
}
