import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo as CameraPhoto,
} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { WriteFile } from '../types/file.type';
import { Capacitor } from '@capacitor/core';
export interface Photos {
  id: number;
  filepath: string;
  webviewPath: string;
  base64string: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoNewService {

  photos: Photos[] = [];
  photoUrl: string;

  constructor( private platform: Platform ) { }

  public async addNewImage(key: number) {
    const capturePhoto: CameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      allowEditing: false,
      saveToGallery: true,
      quality: 100,
      width: 1000,
      height: 1000,
      correctOrientation: true,
    })

    const savedImageFile: Photos = await this.savePicture(
      capturePhoto,
      key,
    )

    this.photos = [savedImageFile, ...this.photos];
    return savedImageFile;
  }

  private async savePicture(photo: CameraPhoto, key: number) {
    const rawData: string = atob(photo.base64String);
    const bytes: number[] = new Array(rawData.length);
    for (let x = 0; x < rawData.length; x++) {
      bytes[x] = rawData.charCodeAt(x);
    }
    const arr: Uint8Array = new Uint8Array(bytes);
    const fileName: string = new Date().getTime() + '.jpeg';
    const blob: Blob = new Blob([arr], { type: 'image/png' });
    this.photoUrl = URL.createObjectURL(blob);

    const savedFile: WriteFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: fileName,
      data: photo.base64String,
    });

    if (this.platform.is('hybrid')) {
      return {
        id: key,
        filepath: savedFile.uri,
        base64string: photo.base64String,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        id: key,
        filepath: fileName,
        base64string: photo.base64String,
        webviewPath: URL.createObjectURL(blob),
      };
    }
  }

  base64Path(base64): string {
    return `data:image/jpeg;base64,${base64}`;
  }
}
