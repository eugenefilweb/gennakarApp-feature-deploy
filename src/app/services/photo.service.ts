import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo as CameraPhoto,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Photo, incidentPhoto } from '../types/general.type';
import { WriteFile } from '../types/file.type';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: Photo[] = [];
  public incidentPhotos: incidentPhoto[] = [];
  imageURL: string;
  capturedPhoto: any;
  photoUrl: string;

  constructor(private _platform: Platform) {}

  /**
   *  For Gallery Photos
   *  Return Key and category
   */
  public async addNewToGallery(
    key: number,
    category: string
  ): Promise<Photo | null> {
    try {
      const capturedPhoto: CameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64, // file-based data; provides best performance
        source: CameraSource.Prompt, // automatically take a new photo with the camera
        allowEditing: false,
        saveToGallery: true,
        quality: 20,
        width: 800,
        height: 800,
        correctOrientation: true,
      });

      const savedImageFile: Photo = await this.savePicture(
        capturedPhoto,
        key,
        category
      );

      this.photos = [savedImageFile, ...this.photos];
      return savedImageFile;
    } catch (error) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
  }

  public async updateNewToGallery(
    key: number,
    category: string
  ): Promise<Photo | null> {
    try {
      const capturedPhoto: CameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64, // file-based data; provides best performance
        source: CameraSource.Prompt, // automatically take a new photo with the camera
        allowEditing: false,
        saveToGallery: true,
        quality: 20,
        width: 800,
        height: 800,
        correctOrientation: true,
      });
      const savedImageFile: Photo = await this.savePicture(
        capturedPhoto,
        key,
        category
      );
      this.photos = [savedImageFile, ...this.photos];

      return savedImageFile;
    } catch (error) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
  }

  private async savePicture(
    photo: CameraPhoto,
    key: number,
    category: string
  ): Promise<Photo | null> {
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

    if (!savedFile.uri) {
    }

    if (this._platform.is('hybrid')) {
      return {
        id: key,
        category: category,
        filepath: savedFile.uri,
        base64string: photo.base64String,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        id: key,
        category: category,
        filepath: fileName,
        base64string: photo.base64String,
        webviewPath: URL.createObjectURL(blob),
      };
    }
  }

  /**
   * For incident Photos
   * Return Key
   */
  public async addNewIncidentPhoto(
    key: number,
    category: string
  ): Promise<incidentPhoto | null> {
    try {
      const capturedPhoto: CameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64, // file-based data; provides best performance
        source: CameraSource.Camera, // automatically take a new photo with the camera
        allowEditing: false,
        saveToGallery: true,
        quality: 20,
        width: 800,
        height: 800,
        correctOrientation: true,
      });

      const savedImageFile: incidentPhoto = await this.savePictureIncident(
        capturedPhoto,
        key,
        category
      );
      this.incidentPhotos = [savedImageFile, ...this.photos];

      return savedImageFile;
    } catch (error) {
      return null;
    }
  }

  public async updateNewIncidentPhoto(
    key: number,
    category: string
  ): Promise<incidentPhoto | null> {
    try {
      const capturedPhoto: CameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64, // file-based data; provides best performance
        source: CameraSource.Prompt, // automatically take a new photo with the camera
        allowEditing: false,
        saveToGallery: true,
        quality: 20,
        width: 800,
        height: 800,
        correctOrientation: true,
      });
      const savedImageFile: incidentPhoto = await this.savePictureIncident(
        capturedPhoto,
        key,
        category
      );
      this.incidentPhotos = [savedImageFile, ...this.photos];
      return savedImageFile;
    } catch (error) {
      return null;
    }
  }

  private async savePictureIncident(
    photo: CameraPhoto,
    key: number,
    category: string
  ): Promise<incidentPhoto | null> {
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

    if (!savedFile.uri) {
    }

    if (this._platform.is('hybrid')) {
      return {
        id: key,
        category: category,
        filepath: savedFile.uri,
        base64string: photo.base64String,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        id: key,
        category: category,
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
