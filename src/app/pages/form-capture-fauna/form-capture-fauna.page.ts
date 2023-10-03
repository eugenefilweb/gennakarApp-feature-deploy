import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { FaunaService } from 'src/app/services/fauna.service';
import { PhotoNewService } from 'src/app/services/photo-new.service';
import { PhotoService } from 'src/app/services/photo.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Photos } from 'src/app/types/general.type';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-capture-fauna',
  templateUrl: './form-capture-fauna.page.html',
  styleUrls: ['./form-capture-fauna.page.scss'],
})
export class FormCaptureFaunaPage implements OnInit {

  datepipe: DatePipe = new DatePipe('en-US');
  id: number = 0;
  key: any = 0;
  barangay: any = '';
  sitio: any = '';
  longitude: any;
  latitude: any;
  photos: Photos[] = [];
  category_id: number = 0;
  category_name: string = '';
  description: string = '';
  formGroup: FormGroup;

  constructor(
    private photoService: PhotoService,
    private photoNewService: PhotoNewService,
    private currentPatrol: CurrentPatrolService,
    private toastController: ToastController,
    private modalController: ModalController,
    private faunaService: FaunaService,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array(
        [],
        [
          Validators.required,
          this.arrayLengthValidator(3)
        ],
      )
    })
  }

  ngOnInit() {

  }

  arrayLengthValidator(expectedLength: number) {
    return (control: FormArray) => {
      if (control.value.length !== expectedLength) {
        return {
          invalidArrayLength: true
        };
      }
      return null;
    };
  }

  async addNewPhoto() {
    const photo: any = await this.photoNewService.addNewImage(this.key);
    this.photos.push(photo)
  }

  async loadingData(header: string, message: string) {
    try {
      const toast: any = await this.toastController.create({
        header: header,
        message: message,
        cssClass: 'toastcustom',
        icon: 'checkmark-circle',
        mode: 'ios',
        animated: true,
        duration: 1500,
        position: 'bottom',
        color: 'success',
      });
      toast.present();
    } catch (err: any) {
      const toast: any = await this.toastController.create({
        header: 'Failed',
        message: 'Failed to load Data',
        cssClass: 'toastcustom',
        icon: 'checkmark-circle',
        mode: 'ios',
        animated: true,
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    } finally {
    }
  }

  modalDismiss() {
    return this.modalController.dismiss();
  }

  saveFauna() {
    const date_encoded: string = this.datepipe.transform(
      new Date().getTime(),
      'YYYY-MMM-dd HH:mm:ss'
    );

    const fauna: any = {
      appId: this.key || new Date().getTime(),
      barangay: this.currentPatrol.patrol.value.barangay,
      sitio: this.currentPatrol.patrol.value.sitio,
      longitude: this.longitude || 0,
      latitude: this.latitude || 0,
      category_id: this.category_id || 0,
      photos: this.photos || [],
      category_name: this.category_name || '',
      description: this.description || '',
      date_encoded: date_encoded || '0/0/0000',
    };

    this.faunaService.setFauna(fauna, () => {
      this.loadingData('Success', 'Fauna Added Successfully');
      this.photoService.photos = [];
      this.modalDismiss();
    });
  }

  base64Path(base64Path: string) {
   return this.photoService.base64Path(base64Path);
  }
  
  deletePhotoAtIndex( index: number ): void {
		if (index >= 0 && index < this.photos.length) {
			// Filter the array to exclude the selected photo
			const filteredPhotos = this.photos.filter((photo, i) => i !== index);

			this.photos = filteredPhotos;
		} else {
			console.log("Invalid index.");
		}
    
  }


  async showLeaveConfirmation() {
		const alert = await this.alertController.create({
			header: 'Confirmation',
			message: `Are you sure you want to save this entry?`,
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => {
						this.modalDismiss();
					},
				},
				{
					text: 'Yes',
					role: 'confirm',
					handler: () => {
						this.saveFauna();
					},
				},
			],
		})

		await alert.present()
	}
}
