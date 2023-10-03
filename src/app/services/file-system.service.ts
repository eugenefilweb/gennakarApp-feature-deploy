import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { NetworkService } from './network.service';
import { PhotoService } from './photo.service';
import { Network } from '../types/general.type';
import { ReadFile, WriteFile } from '../types/file.type';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  network: Network;

  constructor(
    private networkService: NetworkService,
    private photoService: PhotoService
  ) {
    this.networkService.network.subscribe((network: Network) => {
      this.network = network;
    });
  }

  async readFile(path: string, directory: Directory = Directory.External): Promise<ReadFile | null> {
    try {
      const readFile: ReadFile = await Filesystem.readFile({ path, directory });
      return readFile;
    }
    catch (error: any) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
  }

  async writeFile(path: string, data: string = ''): Promise<WriteFile | null> {
    if (data) {
      try {
        const savedFile: WriteFile = await Filesystem.writeFile({ path, data, recursive: true, directory: Directory.External });
        return savedFile;
      }
      catch (error: any) {
        return new Promise((resolve) => {
          resolve(null);
        });
      }
    }
  }

  convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        try {
          resolve(reader.result);
        }
        catch (error: any) {
          resolve(null);
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  downloadImageFromLink(livePath: string, callback: Function = (() => { }), localPath: string = '') {
    localPath = localPath || this.localPathFromLink(livePath);

    this.readFile(localPath).then(async (readFile: ReadFile | null) => {
      if (readFile) {
        callback(this.photoService.base64Path(readFile.data));
      }
      else {
        if (this.network.connected) {
          try {
            fetch(livePath)
              .then(response => response.blob())
              .then(async (blob) => {
                const data: string = (await this.convertBlobToBase64(blob)) as string;
                if (data) {
                  try {
                    this.writeFile(localPath, data).then((writeFile: WriteFile | null) => {
                      this.readFile(localPath).then((readFile: ReadFile | null) => {
                        if (readFile) {
                          callback(this.photoService.base64Path(readFile.data));
                        }
                        else {
                          callback('');
                        }

                      })
                    });
                  }
                  catch (error: any) {
                    callback('');
                    console.log('error', error);
                  }
                }
              })
              .catch((error: any) => {
                callback('');
                console.error(error);
              });
          } 
          catch (error: any) {
            callback('');
            console.log('error', error);
          }
        }
      }
    });
  }

  localPathFromLink(filepath: string): string {
    const arr: string[] = filepath.split("/");

    if (arr.length > 3) {
      arr.splice(0, 3);
    }

    return arr.join('/');
  }

  filenameFromLink(filepath: string): string {
    const filenameWithExtension: string = filepath.split("/").pop();

    return filenameWithExtension;
  }
}
