import { Injectable } from '@angular/core';
import { BackgroundPositionGeolocation, Coordinate, CurrentPatrol, LonLat} from '../types/general.type';
import { CurrentPatrolService } from './storage/current-patrol.service';
import { SettingsService } from './storage/settings.service';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { getDistance } from 'ol/sphere.js';

import { registerPlugin } from '@capacitor/core';
import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation';
import { GeneralSetting, Settings } from '../types/live.type';

const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
	'BackgroundGeolocation'
);

@Injectable({
	providedIn: 'root'
})
export class GeolocationService {
	SETTING_CFT: number = 10;
	SETTING_CRT: number = 25; // radius distance in meters

	settings: Settings;
	current_patrol: CurrentPatrol;
	coordinates: Coordinate[] = [];

	constructor(
		private _settings: SettingsService,
		private _currentPatrol: CurrentPatrolService,
	) {
		this._settings.settings.subscribe((settings: Settings) => {
			this.settings = settings;
		});

		this._currentPatrol.patrol.subscribe((patrol: CurrentPatrol) => {
			this.current_patrol = patrol;
		});

		this._currentPatrol.coordinates.subscribe((coordinates: Coordinate[]) => {
			
			this.coordinates = coordinates || [];
		});
	}

	trackGeolocation() {
		const { coordinate_frequency_tracking, coordinate_radius_tracking }: GeneralSetting = this.settings.general;

		let timer = (coordinate_frequency_tracking || this.SETTING_CFT) * 1000;
		if (Capacitor.getPlatform() == 'web') {
			setInterval(() => {
				this.getWebPosition();
			}, timer);
		}
		else {
			this.guessLocation((position: BackgroundPositionGeolocation) => {
				const { longitude, latitude }: LonLat = position;
				this.saveLocation([longitude, latitude]);
			}, coordinate_radius_tracking);
		}
	}

	getWebPosition() {
		Geolocation.getCurrentPosition({
      // enableHighAccuracy: true,
    })
			.then((position: GeolocationPosition) => {
				
				let { longitude, latitude }: LonLat = position.coords;
				this.saveLocation([longitude, latitude]);
			})
			.catch((error) => {
				console.log('Error getting location', error);
			});
	}

	saveLocation(location: number[]) {
		if (!this.current_patrol.status) {
		  return;
		}

		const [lon, lat] = location;
		const storageLocation: Coordinate[] = this.coordinates || [];
		const timestamp: number = new Date().getTime();

		if (storageLocation.length == 0) {
			this._currentPatrol.addCoordinate({ timestamp, lat, lon });
		}
		else {
			const lastCoordinate: Coordinate = storageLocation[storageLocation.length - 1];
			
			if (lastCoordinate.lat != lat || lastCoordinate.lon != lon) {
				const sourceCoord: number[] = [lastCoordinate.lon, lastCoordinate.lat]; // source coordinate
				const targetCoord: number[] = [lon, lat]; // target coordinate
				const radius: number = this.settings.general.coordinate_radius_tracking || this.SETTING_CRT; // radius distance in meters

				// const sphere = new Sphere(6378137); // create a sphere object with the Earth's radius in meters
				const distance: number = getDistance(sourceCoord, targetCoord); // calculate the distance between the two coordinates in meters
				if (distance <= radius) {
					console.log('The two coordinates are within the radius distance of each other.');
				}
				else {
					console.log('The two coordinates are not within the radius distance of each other.');
					this._currentPatrol.addCoordinate({ timestamp, lat, lon });
				}
			}
			else {
				// console.log('location already stored', storageLocation);
			}
		}
	}

	guessLocation(locationCallback: Function, distanceFilter: number = 0) {

		BackgroundGeolocation.addWatcher(
			{
				// If the "backgroundMessage" option is defined, the watcher will
				// provide location updates whether the app is in the background or the
				// foreground. If it is not defined, location updates are only
				// guaranteed in the foreground. This is true on both platforms.

				// On Android, a notification must be shown to continue receiving
				// location updates in the background. This option specifies the text of
				// that notification.
				backgroundMessage: 'Cancel to prevent battery drain.',

				// The title of the notification mentioned above. Defaults to "Using
				// your location".
				backgroundTitle: 'Tracking Coordinates.',

				// Whether permissions should be requested from the user automatically,
				// if they are not already granted. Defaults to "true".
				requestPermissions: false,

				// If "true", stale locations may be delivered while the device
				// obtains a GPS fix. You are responsible for checking the "time"
				// property. If "false", locations are guaranteed to be up to date.
				// Defaults to "false".
				stale: false,

				// The minimum number of metres between subsequent locations. Defaults
				// to 0.
				distanceFilter,
							},
			function callback(location: BackgroundPositionGeolocation, error: any) {
				if (error) {
					if (error.code === 'NOT_AUTHORIZED') {
						if (
							window.confirm(
								'This app needs your location, ' +
								'but does not have permission.\n\n' +
								'Open settings now?'
							)
						) {
							// It can be useful to direct the user to their device's
							// settings when location permissions have been denied. The
							// plugin provides the 'openSettings' method to do exactly
							// this.
							BackgroundGeolocation.openSettings();
						}
					}
					return console.error(error);
				}

				locationCallback(location);

				return;
			}
		).then(function after_the_watcher_has_been_added(watcher_id) {
			// When a watcher is no longer needed, it should be removed by calling
			// 'removeWatcher' with an object containing its ID.
			// BackgroundGeolocation.removeWatcher({
			//   id: watcher_id,
			// });
		});
	};
}
