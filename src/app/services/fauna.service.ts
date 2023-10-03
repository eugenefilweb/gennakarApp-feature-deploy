import { Injectable } from '@angular/core';
import { Fauna, Form } from '../types/general.type';
import { StorageService } from './storage/storage.service';
import { BehaviorSubject } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class FaunaService {

	faunas: BehaviorSubject<Fauna[]> = new BehaviorSubject([]);
  faunasStorage: string = AuthConstants.FAUNAS;
  
  constructor(
    private storageService: StorageService
  ) { }

  async setFauna(faunaData: Form, callback: Function = (() => { })) {
		let faunas: Form[] = await this.storageService.get(this.faunasStorage) || [];
		faunas.push(faunaData);

		await this.storageService.set(this.faunasStorage, faunas);
		this.faunas.next(faunas);

		callback(faunas);
  }
  
}
