import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Geolocation from 'ol/Geolocation';
import { fromLonLat } from 'ol/proj';
import * as ol from 'ol';
import { Map, Feature } from 'ol';
import { Point } from 'ol/geom';
import { View } from 'ol';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource, XYZ } from 'ol/source.js';
import { LineString } from 'ol/geom';
import { Geolocation as CapacitorGeolocation } from '@capacitor/geolocation';
import { NetworkService } from 'src/app/services/network.service';
import { FileSystemService } from 'src/app/services/file-system.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Coordinate, CurrentPatrol, Network } from 'src/app/types/general.type';
import { defaults as olControlDefaults } from 'ol/control';
import { User } from 'src/app/types/live.type';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/storage/user.service';
import { EnvironmentalIncidentModalPage } from 'src/app/pages/modals/environmental-incident-modal/environmental-incident-modal.page';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';


@Component({
	selector: 'app-openlayer-map',
	templateUrl: './openlayer-map.component.html',
	styleUrls: ['./openlayer-map.component.scss'],
})
	
export class OpenlayerMapComponent implements OnInit {
	@Input() mapsize: string;
	@Input() mapId: string;
	@Input() withLine: string = 'false';
	@Input() type: string = 'open';
	@Input() coordinates: Coordinate[] = [];
	@Input() longitude: number = 0;
	@Input() latitude: number = 0;
	@Input() withRecenterButton: boolean = true;

	map: Map;
	geolocation: Geolocation;
	view: View;
	dragOrZoom: boolean = false;
	network: Network;

	current_patrol: CurrentPatrol;
	user: User;
	userPhotoIcon: string = AuthConstants.DEFAULT_IMAGE;
	timestamp: string = '';

	constructor(
		private _currentPatrol: CurrentPatrolService,
		public _file: FileSystemService,
		private _network: NetworkService,
		public _router: Router,
		public _user: UserService,
		private _modal: ModalController,
		private _toast: ToastService
		
	) {
		this._network.network.subscribe((network: Network) => {
			this.network = network;
		});

		this._currentPatrol.patrol.subscribe((patrol: CurrentPatrol) => {
			this.current_patrol = patrol;
			if (this.current_patrol.coordinates) {
				this._toast.presentToast('Coordinates', 'Initialize Complete', 'top', 'success', 'checkbox');
			}
		});
		this._currentPatrol.patrolTimestamp.subscribe((timestamp: string) => {
			this.timestamp = timestamp;
		});

		this._user.user.subscribe((user: User) => {
			this.user = user;

			this._file.downloadImageFromLink(user.userPhotoIcon, (base64: string) => {
				this.userPhotoIcon = base64;
			});
		});
	}
	ngOnInit() {
		this.init();
	}



	init() {
		
		if (this.type == 'currentPatrol') {
			this._currentPatrol.coordinates.subscribe((coordinates: Coordinate[]) => {

				console.log('coordinates', coordinates);


				if (this.map && this.coordinates.length != coordinates.length) {
					let newCoordinates: Coordinate[] = [];

					coordinates.forEach((element, index) => {
						if (index >= this.coordinates.length) {
							newCoordinates.push(element);
						}
					});

					const lastCoordinate: Coordinate = this.coordinates[this.coordinates.length - 1];
					const start: number[] = lastCoordinate ? fromLonLat([lastCoordinate.lon, lastCoordinate.lat]) : [];

					this.addCoordinates(this.map, newCoordinates, start);
				}
			});
			setTimeout(() => {
				CapacitorGeolocation.getCurrentPosition({enableHighAccuracy: true})
					.then((position: GeolocationPosition) => {            
						let { longitude, latitude }: GeolocationCoordinates = position.coords;
						this.longitude = longitude;
						this.latitude = latitude;
						this.initMap();
					})
					.catch((error: any) => {
						this.initMap();
						console.log('Error getting location', error);
					});
			}, 500);
		} else {
			setTimeout(() => {
				if (this.coordinates.length) {
					let { lon, lat }: Coordinate = this.coordinates[0];
					this.longitude = lon;
					this.latitude = lat;
					this.initMap();
				} else {
					CapacitorGeolocation.getCurrentPosition({
						enableHighAccuracy: true,
					})
					.then((position: GeolocationPosition) => {
						let { longitude, latitude }: GeolocationCoordinates = position.coords;
						this.longitude = longitude;
						this.latitude = latitude;
						this.initMap();
					})
					.catch((error: any) => {
						this.initMap();
						console.log('Error getting location', error);
					});
					// navigator.geolocation.getCurrentPosition((position) => {
					//   let { longitude, latitude } = position.coords;
					//   this.longitude = longitude;
					//   this.latitude = latitude;
					//   this.initMap();
					// });
				}
			}, 0);
		}
	}

	async initMap(force: boolean = false): Promise<Geolocation> {

		this.network = await this._network.getNetwork();
		
		let view: View =
			this.view ||
			new View({
				center: fromLonLat([this.longitude, this.latitude]),
				zoom: 15,
			});

		if (force) {
			view = new View({
				center: fromLonLat([this.longitude, this.latitude]),
				zoom: 15,
			});
		}
		this.view = view;

		let sourceUrl = 'assets/open-layer/{z}/{x}/{y}.png';
		if (navigator.onLine) {
			sourceUrl = `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
		} 
		
		const source: OSM = new OSM({
			url: sourceUrl,
		});

		source.on('tileloadstart', (event: any) => {
			const [z, x, y]: number[] = event.tile.tileCoord;

			const localUrl: string = `assets/open-layer/${z}/${x}/${y}.png`;
			const liveUrl: string = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;

			this._file.downloadImageFromLink(liveUrl, (base64: any) => {
				var tileLoadFunction = function (imageTile, src) {
					imageTile.getImage().src = base64;
				};

				if (event.tile.tileLoadFunction_ != tileLoadFunction) {
					event.tile.tileLoadFunction_ = tileLoadFunction;
					event.tile.load();
				}
			}, localUrl);
		});
		
		const controls = olControlDefaults({
			attribution: false,
			zoom: false,
		});

		const map: Map = this.map || new Map({
			layers: [
				new TileLayer({
					preload: Infinity,
					source,
				}),
			],
			target: this.mapId,
			view: view,
			controls: controls
		});

		this.map = map;

		map.on('pointerdrag', (event) => {
			this.dragOrZoom = true;
		});

		map.getView().on('change:resolution', (event) => {
			this.dragOrZoom = true;
		});

		const geolocation: Geolocation =
			this.geolocation||
			new ol.Geolocation({
				trackingOptions: {
					enableHighAccuracy: true,
				},
				projection: view.getProjection(),
			});
		
		if (this.withRecenterButton) {
			// Set the rotation of the map to the user's heading
			geolocation.on('change', () => {
				if (!this.dragOrZoom) {
					const heading = geolocation.getHeading();
					if (typeof heading === 'number') {
						const view = map.getView();
						view.setRotation(-heading);
					}
				}
			});
		}

		geolocation.setTracking(true);

		geolocation.on('error', function (error: any) {
			console.log('geolocation_error', error)
		});



		const positionFeature: Feature = new Feature();
		positionFeature.setStyle(
			new Style({
				image: new CircleStyle({
					radius: 6,
					fill: new Fill({
						color: '#3399CC',
					}),
					stroke: new Stroke({
						color: '#fff',
						width: 2,
					}),
				}),
			})
		);

		new VectorLayer({
			map: map,
			source: new VectorSource({
				features: [ positionFeature],
			}),
		});

		if (this.withRecenterButton) {
			geolocation.on('change:position', () => {
				if (!this.dragOrZoom) {
					const coordinates = geolocation.getPosition();
					map.getView().setCenter(coordinates);
					positionFeature.setGeometry(
						coordinates ? new Point(coordinates) : null
					);
				}
			});
		}

		if (this.coordinates && this.coordinates.length) {
			this.addCoordinates(map, this.coordinates);
		}

		this.geolocation = geolocation;
		return geolocation;
	}

	async reCenter() {
		const positionFeature: Feature = new Feature();
		positionFeature.setStyle(
			new Style({
				image: new CircleStyle({
					radius: 6,
					fill: new Fill({
						color: '#3399CC',
					}),
					stroke: new Stroke({
						color: '#fff',
						width: 2,
					}),
				}),
			})
		);

		const coordinates: number[] = await this.geolocation.getPosition();

		this.map.getView().setCenter(coordinates);
		positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
		this.dragOrZoom = false;
	}

	addLineLayer = ({ lat, lon, start }): VectorLayer<VectorSource> => {
		const line_feat1: Feature = new Feature({
			geometry: new LineString([start, [lat, lon]]),
			name: 'My_Simple_LineString',
		});

		const veclay_line = new VectorLayer({
			source: new VectorSource({
				features: [line_feat1],
				wrapX: false,
			}),
			style: new Style({
				stroke: new Stroke({
					color: '#f64e60',
					width: 4,
					lineDash: [7, 7, 7],
// lineCap: "butt"
				}),
			}),
		});

		return veclay_line;
	};

	addMarkerLayer = (lat, lon): VectorLayer<VectorSource> => {
		const marker = new Feature({
			geometry: new Point(fromLonLat([lon, lat])), // Replace with the desired coordinates
		});
		
		marker.setStyle(
			new Style({
			  image: new Icon({
				src: 'https://cdn-icons-png.flaticon.com/128/2452/2452655.png', // Replace with your marker image path
				scale: 2, // Adjust the size of the marker
			  }),
			})
		);
		const vectorLayer = new VectorLayer({
			source: new VectorSource({
			  features: [marker],
			}),
		});
	
		return vectorLayer
	};

	addCoordinates = (map: Map, coordinates: Coordinate[], start: number[] = []) => {
		// const coord = [
		// 	{lat: 14.764906138671236, lon: 121.61907871411864},
		// 	{lat: 14.770549829491955, lon: 121.62749012158935},
		// 	{lat: 14.772209710665564, lon: 121.63092543749752},
		// 	{lat: 14.771545759717668, lon: 121.63590361742915},
		// 	{lat: 14.771545759717668, lon: 121.6473173817016},
		// ]

		// for (let cd in coord) {
		// 	const coords = coord[cd];
		// 	const [lat, lon]: number[] = fromLonLat([coords.lon, coords.lat]);
		// 	if (this.withLine == 'true') {
		// 		if (start.length == 0) {
		// 			start = [lat, lon];
		// 		}
		// 		map.addLayer(this.addLineLayer({ start, lat, lon }));
		// 		map.addLayer(this.addMarkerLayer(lat, lon)); 


		// 	}
		// }
		for (let index in coordinates) {
			const coordinate: Coordinate = coordinates[index];
			const [lat, lon]: number[] = fromLonLat([coordinate.lon, coordinate.lat]);
			map.addLayer(this.addMarkerLayer(lat, lon));
			// START DRAW LINE
			if (this.withLine == 'true') {
				if (start.length == 0) {
					start = [lat, lon];
				}
				map.addLayer(this.addMarkerLayer(lat, lon)); 
				if (navigator.onLine) {
				map.addLayer(this.addLineLayer({ start, lat, lon }));
			}
				start = [lat, lon];
			}
			// END DRAW LINE
		}
			
			
		// for (let index in coordinates)
		// 	const coordinate: Coordinate = coordinates[index];
		// 	const [lat, lon]: number[] = fromLonLat([coordinate.lon, coordinate.lat]);
		// 	// START DRAW LINE

		// 	if (this.withLine == 'true') {
		// 		if (start.length == 0) {
		// 			start = [lat, lon];
		// 		}
				
		// 		if (navigator.onLine) {
		// 			map.addLayer(this.addLineLayer({ start, lat, lon }));
		// 		} 
		// 	}
		// 	// END DRAW LINE
		// }
	};

	zoomIn() {
		const view = this.map.getView();
		view.setZoom(view.getZoom() + 1);
	}

	zoomOut() {
		const view = this.map.getView();
		view.setZoom(view.getZoom() - 1);
	}

	async modalReport() {
		const modal: any = await this._modal.create({
			component: EnvironmentalIncidentModalPage,
		});
		modal.present();
	}

	endPatrol() {
		this._currentPatrol.end();
	}
}
