import { Injectable } from '@angular/core';
import { AuthConstants } from '../config/auth-constants';
import { Coordinate } from '../types/general.type';
import { StorageService } from './storage/storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService {
  coordinates: BehaviorSubject<Coordinate[]> = new BehaviorSubject([]);
  coordinatesName: string = AuthConstants.COORDINATES;
  
  constructor(
    private storageService: StorageService
  ) { }

  async initCoordinate() {
    this.storageService.set(this.coordinatesName, []).then((coordinates: Coordinate[]) => {
      if (coordinates) {
        this.coordinates.next(coordinates);
      }
    }).catch(error => {
      console.log('error', error);
    })
  }

  async setCoordinate(coordinateData: Coordinate, callback: Function = (() => { })) {
		let coordinates: Coordinate[] = await this.storageService.get(this.coordinatesName) || [];
		coordinates.push(coordinateData);

		await this.storageService.set(this.coordinatesName, coordinates);
		this.coordinates.next(coordinates);
		callback(coordinates);
	}
}
