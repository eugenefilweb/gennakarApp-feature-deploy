import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../config/util';
import { Coordinate, Flora, Patrol, EnvironmentalIncident, Fauna } from '../types/general.type';
import { ToBlob } from '../types/file.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private ObjectToFormData(obj: Object): FormData {
    let formData: FormData = new FormData();
    Object.entries(obj).forEach((entry) => {
      const [key, value]: [key: string, value: any] = entry;
      formData.append(key, value.toString());
    });

    return formData;
  }

  private getHeaders(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders({
      //   'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': '*',
      // 'withCredentials': 'false',
      // 'mode': 'no-cors'
    });

    return headers;
  }

  postLogin(serviceName: string, param: Object): Observable<any> {
    const url: string = environment.apiUrl + serviceName;
    const headers: HttpHeaders = this.getHeaders();
    const formData: FormData = this.ObjectToFormData(param);

    return this.http.post(url, formData, { headers });
  }

  postForm(serviceName: string, param: Object): Observable<any> {
    const url: string = environment.apiUrl + serviceName;
    const headers: HttpHeaders = this.getHeaders();
    const formData: FormData = this.ObjectToFormData(param);

    return this.http.post(url, formData, { headers });
  }

  toBlob(arr): ToBlob[] {
    let blobArray: ToBlob[] = [];
    if (!Utils.isUndefined(arr)) {
      for (let i = 0; i < arr.length; i++) {
        const byteCharacters: string = atob(arr[i].base64string);
        const byteNumbers: number[] = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray: Uint8Array = new Uint8Array(byteNumbers);
        const blob: Blob = new Blob([byteArray], { type: 'image/png' });

        blobArray.push({ blob, filepath: arr[i].filepath });
      }
    }
    return blobArray;
  }

  incidentBlobToFormData({ arr, fd, }: { arr: ToBlob[], fd: FormData }) {
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        let { blob, filepath }: ToBlob = arr[i];
        fd.append(`photos[${i}]`, blob, filepath);
      }
    }
  }

  floraBlobToFormData({ arr, indexFlora, indexPatrol, fd }: { arr: ToBlob[]; indexFlora: number; indexPatrol: number; fd: FormData; }) {
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        let { blob, filepath }: ToBlob = arr[i];
        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][photos][${i}]`,
          blob,
          filepath
        );
      }
    }
  }

  faunaBlobToFormData({ arr, indexFauna, indexPatrol, fd }: { arr: ToBlob[]; indexFauna: number; indexPatrol: number; fd: FormData; }) {
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        let { blob, filepath }: ToBlob = arr[i];
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][photos][${i}]`,
          blob,
          filepath
        );
      }
    }
  }

  post(serviceName: string, param: any): Observable<any> {
    let fd: FormData = new FormData();
    for (let indexPatrol = 0; indexPatrol < param.length; indexPatrol++) {
      const {
        watershed,
        coordinates,
        notes,
        floras,
        faunas,
        barangay,
        sitio,
        timestamp,
        lastTimestamp,
        distance,
      }: Patrol = param[indexPatrol];

      fd.append(`patrols[${indexPatrol}][watershed]`, watershed);
      fd.append(`patrols[${indexPatrol}][distance]`, distance.toString());
      fd.append(`patrols[${indexPatrol}][total_time]`, (lastTimestamp - timestamp).toString());
      fd.append(`patrols[${indexPatrol}][notes]`, notes);

      for (let indexCoord = 0; indexCoord < coordinates.length; indexCoord++) {
        const { lat, lon, timestamp }: Coordinate = coordinates[indexCoord];
        fd.append(
          `patrols[${indexPatrol}][coordinates][${indexCoord}][lat]`,
          lat.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][coordinates][${indexCoord}][lon]`,
          lon.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][coordinates][${indexCoord}][timestamp]`,
          timestamp.toString()
        );
      }

      for (let indexFlora = 0; indexFlora < floras.length; indexFlora++) {
        const {
          appId,
          // common_name,
          // kingdom,
          // family,
          longitude,
          latitude,
          // taxonomic_group,
          // genus,
          // species,
          // sub_species,
          // varieta_and_infra_var_name,
          description,
          photos,
          category_id,
          date_encoded,
          barangay,
          sitio,
        }: Flora = floras[indexFlora];

        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][appId]`,
          appId.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][category_id]`,
          category_id.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][longitude]`,
          longitude.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][latitude]`,
          latitude.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][description]`,
          description.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][date_encoded]`,
          date_encoded
        );
        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][barangay]`,
          barangay
        );
        fd.append(
          `patrols[${indexPatrol}][floras][${indexFlora}][sitio]`,
          sitio
        );
        // images
       
        this.floraBlobToFormData({
          arr: this.toBlob(photos),
          indexFlora,
          indexPatrol,
          fd,
        });
      }

      for (let indexFauna = 0; indexFauna < faunas.length; indexFauna++) {
        const {
          appId,
          longitude,
          latitude,
          photos,
          category_id,
          date_encoded,
          description,
          barangay,
          sitio,
        }: Fauna = faunas[indexFauna];
        
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][appId]`,
          appId.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][category_id]`,
          category_id.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][longitude]`,
          longitude.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][latitude]`,
          latitude.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][description]`,
          description.toString()
        );
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][date_encoded]`,
          date_encoded
        );
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][barangay]`,
          barangay
        );
        fd.append(
          `patrols[${indexPatrol}][faunas][${indexFauna}][sitio]`,
          sitio
        );
        // images
       
        this.faunaBlobToFormData({
          arr: this.toBlob(photos),
          indexFauna,
          indexPatrol,
          fd,
        });
      }

      fd.append(`patrols[${indexPatrol}][barangay]`, barangay);
      fd.append(`patrols[${indexPatrol}][sitio]`, sitio);
      fd.append(`patrols[${indexPatrol}][timestamp]`, timestamp.toString());
      fd.append(`patrols[${indexPatrol}][lastTimestamp]`, lastTimestamp.toString());
    }

    const headers: HttpHeaders = this.getHeaders();
    const url: string = environment.apiUrl + serviceName;

    return this.http.post(url, fd, { headers });
  }

  get(serviceName: string, param: Object = {}): Observable<any> {
    const url: string = environment.apiUrl + serviceName;
    const str: string = Object.entries(param)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

    if (str) {
      return this.http.get(url + '?' + str);
    }

    return this.http.get(url);
  }

  postIncident(serviceName: string, param: any): Observable<any> {
    let fd: FormData = new FormData();
    console.log('param', param);
    const {
      date_time,
      longitude,
      latitude,
      photos,
      watershed,
      incident,
      incident_type,
      barangay,
      sitio,
      description,
      additional_details,
    }: EnvironmentalIncident = param;
    fd.append('date_time', date_time);
    fd.append('longitude', longitude);
    fd.append('latitude', latitude);
    this.incidentBlobToFormData({ arr: this.toBlob(photos), fd });
    fd.append('watershed', watershed);
    fd.append('barangay', barangay);
    fd.append('sitio', sitio);
    fd.append('incident', incident === null ? '0' :  incident.toString());
    fd.append('incident_type',  incident_type === null ? '0' : incident_type.toString());
    fd.append('description', description === null ? 'n/a' : description);
    fd.append('additional_details', additional_details === null ? 'n/a' : additional_details);
    const headers: HttpHeaders = this.getHeaders();
    const url: string = environment.apiUrl + serviceName;
    
    return this.http.post(url, fd, { headers });
  }


    // return

    // for (let indexIncident = 0; indexIncident < param.length; indexIncident++) {
    //   console.log('param', param);
    //   const {
    //     user_id,
    //     date_time,
    //     longitude,
    //     latitude,
    //     photos,
    //     watershed,
    //     incident,
    //     incident_type,
    //     description,
    //     additional_details,
    //   }: EnvironmentalIncident = param[indexIncident];
    //   console.log('indexIncident', indexIncident);
      
  
}
