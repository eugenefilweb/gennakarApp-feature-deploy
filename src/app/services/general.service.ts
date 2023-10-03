import { Injectable } from '@angular/core';
import { getDistance } from 'ol/sphere';
import { Coordinate } from '../types/general.type';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  objectNotEmpty(obj: Object): boolean {
    return !this.isEmptyObject(obj);
  }

  isEmptyObject(obj: Object): boolean {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }

  isEmptyObjectMultiple(array: Object[]): boolean {
    for (let index = 0; index < array.length; index++) {
      const isEmpty = this.isEmptyObject(array[index]);

      if (isEmpty === false) {
        return false;
      }
    }
    return true;
  }

  convertTime(s: any): string {
    let seconds: number | string = parseInt(s, 10);
    let hours: number | string = Math.floor(seconds / 3600);
    let minutes: number | string = Math.floor((seconds - (hours * 3600)) / 60);

    seconds = seconds || 0;
    hours = hours || 0;
    minutes = minutes || 0;

    seconds = seconds - (hours * 3600) - (minutes * 60);

    seconds = seconds <= 9 ? `0${seconds}` : seconds;

    if (!!hours) {
      hours = hours <= 9 ? `0${hours}` : hours;

      if (!!minutes) {
        minutes = minutes <= 9 ? `0${minutes}` : minutes;
        return `${hours}:${minutes}:${seconds}`
      }
      else {
        return `${hours}:${seconds}`
      }
    }

    minutes = minutes <= 9 ? `0${minutes}` : minutes;
    return `${minutes}:${seconds}`
  }

  totalDistance(coords: Coordinate[]): number {
    let total: number = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      let lat1: number = coords[i].lat;
      let lon1: number = coords[i].lon;

      let lat2: number = coords[i + 1].lat;
      let lon2: number = coords[i + 1].lon;

      total += getDistance([lon1, lat1], [lon2, lat2]);
    }
    return total;
  }

  formatMilliseconds(milliseconds: number): string | number {
    const seconds: number = Math.floor(milliseconds / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    let timeString = "";
    if (days > 0) {
      timeString += days + " day" + (days > 1 ? "s " : " ");
    }
    if (hours > 0) {
      timeString += hours % 24 + " hour" + (hours % 24 > 1 ? "s " : " ");
    }
    if (minutes > 0) {
      timeString += minutes % 60 + " minute" + (minutes % 60 > 1 ? "s " : " ");
    }
    if (seconds > 0) {
      timeString += seconds % 60 + " second" + (seconds % 60 > 1 ? "s " : " ");
    }
    return timeString.trim() || 0;
  }

  formatDate(milliseconds: number, datetimeformat='YYYY-MM-DD HH:mm:ss'): string {
    const date: Date = new Date(milliseconds);
    return moment(date).format(datetimeformat);
  }

  formatDateTime(milliseconds: number): string {
    const date: Date = new Date(milliseconds);
    const year: number = date.getFullYear();
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const day: string = date.getDate().toString().padStart(2, '0');
    let hours: string = date.getHours().toString().padStart(2, '0');
    const minutes: string = date.getMinutes().toString().padStart(2, '0');
    const seconds: string = date.getSeconds().toString().padStart(2, '0');
    let AMPM: string = 'AM';

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString().padStart(2, '0');
      AMPM = 'PM';
    }

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${AMPM}`;
  }

  getPosition(callback: Function = (() => { }), errorCallback: Function = (() => { })) {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      callback(position);
    }, (error: any) => {
      errorCallback(error);
      console.log('error', error);
    });
  }
}
