import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapPage } from '../map/map.page';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Router } from '@angular/router';
import { CurrentPatrol } from 'src/app/types/general.type';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.page.html',
  styleUrls: ['./location-picker.page.scss'],
})
export class LocationPickerPage implements OnInit {

  public successCallback: Function = (() => { });
  public errorCallback: Function = (() => { });

  watershed: any;
  barangay: any;
  sitio: any;
  photos: any;

  listOfWatershed = [
    'Kaliwa',
    'Kanan',
    'Umiray',
    'Agos-Nakar Side',
    'Anibungan',
    'Banbanan',
    'Depalyon',
    'Guindan',
    'Ibona',
    'Idyang',
    'Ikdan',
    'Magnac',
    'Malatunglan',
    'Masanga',
    'Masla',
    'Tamala',
  ];

  listOfBarangay = [
    'Anoling',
    'Banglos',
    'Batangan',
    'Catablingan',
    'Canaway',
    'Lumutan',
    'Mahabang Lalim',
    'Maigang',
    'Maligaya',
    'Magsikap',
    'Minahan Norte',
    'Minahan Sur',
    'Pagsangahan',
    'Pamplona',
    'Pisa',
    'Poblacion',
    'Sablang',
    'San Marcelino',
    'Umiray'
  ];

  

  constructor(
    private modalController: ModalController,
    private currentService: CurrentPatrolService,
    public router: Router,
  ) {}

  ngOnInit() {
  }

  onWatershedChange(event: CustomEvent):void {
    this.watershed = event.detail.value;
  }

  onBarangayChange(event: CustomEvent):void {
    this.barangay = event.detail.value;
  }

  startPatrol(): void {
    this.currentService.start('', this.watershed, this.barangay, this.sitio, (patrol: CurrentPatrol) => {
      this.modalController.dismiss();
      this.successCallback()
      this.router.navigate(['/map']);
    })
  }

  modalDismiss() {
    this.modalController.dismiss();
  }
}
