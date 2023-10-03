import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private asc: ActionSheetController,
  ) { }

  async actionSheet({ header, subHeader, mode, cssClass = 'custom-actionsheet-controller', buttons }) {
    const actionSheet: any = await this.asc.create({
      header,
      subHeader,
      mode,
      cssClass,
      buttons,
    });

    await actionSheet.present();
  }

  endPatrol() {
    return this.actionSheet({
      header: 'End Patrol?',
      subHeader: 'All encoded data will be save locally.',
      mode: 'md',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {

          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
      ]
    });
  }
}
