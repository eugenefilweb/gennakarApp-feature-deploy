import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { LoadingController } from '@ionic/angular';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from 'src/environments/environment';
import { GeolocationService } from './geolocation.service';
import { CurrentPatrolService } from './storage/current-patrol.service';
import { Coordinate } from '../types/general.type';
@Injectable({
	providedIn: 'root'
})
export class MapboxService {
	latitude: number = 14;
	longitude: number = 90;
	constructor(
		private loadingController: LoadingController,
	) { }

	initMap(container: string) {
		// navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
		// 	console.log(position);
		// }, (error: any) => {
		// 	console.log('error', error);
		// });
		 Geolocation.getCurrentPosition({enableHighAccuracy: true}).then(async (position: Position) => {
			const loading = await this.loadingController.create({
				message: 'Getting Location',
				spinner: 'circles',
			})
			await loading.present();
			if (position.coords) {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				loading.dismiss();
			}

			mapboxgl.accessToken = environment.MAP_BOX_TOKEN;
			
			console.log(this.latitude);
			console.log(this.longitude);

			const map = new mapboxgl.Map({
				container: container, // Container ID
				style: 'mapbox://styles/mapbox/streets-v12', // Map style
				center: [this.longitude, this.latitude], // Initial center coordinates
				zoom: 9 // Initial zoom level
			});
			
			const geolocate = new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true,	// When active the map will receive updates to the device's location as it changes.
				showUserHeading: true,	// Draw an arrow next to the location dot to indicate which direction the device is heading.
				showAccuracyCircle: true
			})
			 const { latitude, longitude } = position.coords;
			 const geojson = {
				type: 'Feature',
				geometry: {
				  type: 'LineString',
				  coordinates: [],
				},
			};
			geolocate.on('geolocate', (event) => {
				const { longitude, latitude } = event.coords;
				const newCoordinates = geojson.geometry.coordinates.slice();
				newCoordinates.push([longitude, latitude]);
				geojson.geometry.coordinates = newCoordinates;
		
				// Update the source data
				map.getSource('route').setData(geojson);
		
				// Update the map's center to the current location
				map.setCenter([longitude, latitude]);
			  }); 
			map.addControl(geolocate);
			map.on('load', function () {
				map.resize();
				geolocate.trigger();
				map.addSource('route', {
					type: 'geojson',
					data: geojson
				});
				map.addLayer({
					'id': 'route',
					'type': 'line',
					'source': 'route',
					'layout': {
						'line-join': 'round',
						'line-cap': 'round'
					},
					'paint': {
						'line-color': '#888',
						'line-width': 8
					}
				});
			});
		}).catch((error) => {
			console.error('Geolocation error:', error);
		});

	}
}
