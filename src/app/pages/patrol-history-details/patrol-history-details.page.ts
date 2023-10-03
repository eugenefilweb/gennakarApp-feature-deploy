import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ForSubmittedViewPage } from '../for-submitted-view/for-submitted-view.page';
import { ValidationViewModalPage } from '../modals/validation-view-modal/validation-view-modal.page';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PhotoService } from 'src/app/services/photo.service';
import { GeneralService } from 'src/app/services/general.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { Coordinate, CurrentPatrol, EnvironmentalIncident, Fauna, Flora, Patrol, Photo } from 'src/app/types/general.type';
import { IncidentService } from 'src/app/services/storage/incident.service';

@Component({
  selector: 'app-patrol-history-details',
  templateUrl: './patrol-history-details.page.html',
  styleUrls: ['./patrol-history-details.page.scss'],
})
export class PatrolHistoryDetailsPage implements OnInit {
  tripId: number;
  watershed: string;
  createdAt: string;
  floras: Flora[] = [];
  faunas: Fauna[] = [];
  incidents: EnvironmentalIncident[] = [];
  coordinates: Coordinate[] = [];
  distance: number = 0;
  travelHours: string | number;
  statusLabel: string;
  statusClass: string;
  type: string = 'offline'
  isCurrentPatrol: boolean = false;
  defaultImage: string = AuthConstants.DEFAULT_IMAGE;

  constructor(
    private _modal: ModalController,
    private _router: Router,
    private photoService: PhotoService,
    private _general: GeneralService,
    private _currentPatrol: CurrentPatrolService,
    private _incident: IncidentService
  ) {
  }

  formatMilliseconds(milliseconds: number) {
    return this._general.formatMilliseconds(milliseconds);
  }

  ngOnInit() {
    if (this.isCurrentPatrol) {
      this._currentPatrol.patrol.subscribe((patrol: CurrentPatrol) => {
        if (patrol.syncStatus == 'Ongoing') {
          this.travelHoursInterval(patrol);
        }
        else {
          this.travelHours = this.formatMilliseconds(patrol.lastTimestamp - patrol.timestamp);
        }
      });

      this._currentPatrol.floras.subscribe((floras: Flora[]) => {
        this.floras = floras || [];
      });

      this._currentPatrol.faunas.subscribe((faunas: Fauna[]) => {
        this.faunas = faunas || [];
      });

      this._currentPatrol.coordinates.subscribe((coordinates: Coordinate[]) => {
        this.coordinates = coordinates || [];
        this.distance = this._general.totalDistance(coordinates);
      });

  
    }
    this._incident.incident.subscribe((incident: EnvironmentalIncident[]) => {
      this.incidents = incident || []
      console.log('this.incidents', this.incidents);
      
    })
  }

  travelHoursInterval(patrol: Patrol) {
    setInterval(() => {
      this.travelHours = this.formatMilliseconds((new Date().getTime()) - patrol.timestamp);
    }, 1000);
  }

  modalDismiss = () => {
    this._modal.dismiss();
  }

  endPatrol() {
    this._currentPatrol.end(() => {
      this._modal.dismiss();
      // this._router.navigate(['/tabs/patrol-history']);
    });
  }

  parsePhotos(photos: Photo[] = []): string[] {
    let response: string[] = [];
    for (let index = 0; index < photos.length; index++) {
      const photo = photos[index];
      response.push(this.photoService.base64Path(photo.base64string));
    }
    return response;
  }

  async viewFlora(flora: Flora): Promise<void> {
    if (this.isCurrentPatrol) {
      const modal: any = await this._modal.create({
        cssClass: "modal-fullscreen",
        component: ForSubmittedViewPage,
        componentProps: { appId: flora.appId, }
      })
      return modal.present();
    }

    if (this.type == 'offline') {
      const photoUrls: any = {
        // fullheight: this.parsePhotos(flora.fullheight),
        // immediate_vicinity: this.parsePhotos(flora.immediate_vicinity),
        // leaves: this.parsePhotos(flora.leaves),
        // trunk: this.parsePhotos(flora.trunk),
        // fruit: this.parsePhotos(flora.fruit),
        // roots: this.parsePhotos(flora.roots),
        // west_left: this.parsePhotos(flora.west_left),
        // east_right: this.parsePhotos(flora.east_right),
      };

      const modal: any = await this._modal.create({
        cssClass: "modal-fullscreen",
        component: ValidationViewModalPage,
        animated: true,
        componentProps: {
          // common_name: flora.common_name,
          // description: flora.description,
          // kingdom: flora.kingdom,
          // family: flora.family,
          // genus: flora.genus,
          // species: flora.species,
          // longitude: flora.longitude,
          // latitude: flora.latitude,
          // sub_species: flora.sub_species,
          // date: flora.date_encoded,
          // taxonomic_group: flora.taxonomic_group,
          // varieta_and_infra_var_name: flora.varieta_and_infra_var_name,
          photoUrls,
        }
      });
      return modal.present();
    }

    if (this.type == 'online') {
      const modal: any = await this._modal.create({
        cssClass: "modal-fullscreen",
        component: ValidationViewModalPage,
        animated: true,
        componentProps: flora
      });
      return modal.present();
    }
  }

  addFlora() {
    this._modal.dismiss();
    this._router.navigate(['tabs/flora/for-submitted/showForm']);
  }

  formImage(form: any): string {
    if (this.type == 'online') {
      return form?.tablePhotoUrl || this.defaultImage;
    }

    return form.photos[0] ? (this.photoService.base64Path(form.photos[0].base64string) || AuthConstants.DEFAULT_IMAGE) : AuthConstants.DEFAULT_IMAGE
  }

	getBadgeColor(syncStatus: string): string {
		switch (syncStatus) {
			case 'Ongoing':
				return 'progress';
			case 'Pending':
				return 'pending';
			case 'Syncing':
				return 'pending';
			case 'Completed':
				return 'completed';
			default:
				return 'primary'; // You can change this default color as needed
		}
	}
  
  generateFloraValidationName(floraId: any): string {
		const floraMap: { [key: number]: string } = {
			1: "Epipitas" ,
			2: "Pako",
			3: "Damo at Uwak-Uwakan",
			4: "Halamang-Agbon",
			5: "Kahoy",
			6: "Gumagapang na halaman",
			7: "Palma",
			8: "Halaman na Mababa",
			99: "Iba pa"
		};
		return floraMap[floraId] || "Others";
  }
  
  generateFaunaValidatedName(faunaId: any) {
    const faunaMap: { [key: number]: string } = {
      1: 'Isda',
      2: 'Arthropoda',
      3: 'Ibon',
      4: 'Amphibians',
      5: 'Mammals',
      6: 'Reptiles',
      7: 'Iba pa',
      99: "Iba pa"
    };

    return faunaMap[faunaId] || "Others";
  }

  generateIncidentName(incidentId: any): string {
		const incidentMap: { [key: number]: string } = {
			1: "Logging",
			2: "Land Clearing",
			3: "Enroachment",																
			4: "Poaching",
			5: "Soil Erosion",
			6: "Illegal Forest Activity",
      7: "Pollution",
      8: "Damaged Infrastracture",
      9: "Other" 
		};
		return incidentMap[incidentId] || "Others";
  }
  // formImage(form: any): string {
  //   if (this.type == 'online') {
  //     return form?.tablePhotoUrl || this.defaultImage;
  //   }

  //   return form.photos[0] ? (this.photoService.base64Path(form.photos[0].base64string) || AuthConstants.DEFAULT_IMAGE) : AuthConstants.DEFAULT_IMAGE
  // }
  imageSrc(incident: EnvironmentalIncident): string {
		return incident.photos[0] ? (this.photoService.base64Path(incident.photos[0].base64string) || AuthConstants.DEFAULT_IMAGE) : AuthConstants.DEFAULT_IMAGE;
	}
}
