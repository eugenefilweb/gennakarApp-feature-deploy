import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalController, ToastController, IonContent } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';
import { DatePipe } from '@angular/common';
import { LibrarySearchModalPage } from '../modals/library-search-modal/library-search-modal.page';
import { Photo } from 'src/app/types/general.type';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { GeneralService } from 'src/app/services/general.service';
import { Library } from 'src/app/types/live.type';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-form-flora',
  templateUrl: './form-flora.page.html',
  styleUrls: ['./form-flora.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormFloraPage implements OnInit {
  @ViewChild('pageTop') pageTop: IonContent;
  key: number = 0;
  common_name: string = '';
  kingdom: string = '';
  family: string = '';
  taxonomic_group: string = '';
  genus: string = '';
  species: string = '';
  sub_species: string = '';
  varieta_and_infra_var_name: string = '';
  description: string = '';
  barangay: string = '';
  sitio: string = '';
  longitude: number = 0;
  latitude: number = 0;
  datepipe: DatePipe = new DatePipe('en-US');
  currentSegment: string = 'generalFlora';

  fullheight: Photo[] = [];
  immediate_vicinity: Photo[] = [];
  leaves: Photo[] = [];
  trunk: Photo[] = [];
  fruit: Photo[] = [];
  roots: Photo[] = [];
  west_left: Photo[] = [];
  east_right: Photo[] = [];

  constructor(
    private _photo: PhotoService,
    private _modal: ModalController,
    private _toast: ToastController,
    private _currentPatrol: CurrentPatrolService,
    private _general: GeneralService
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.pageTop.scrollToTop();
  }

  nagivatePhoto() {
    return (this.currentSegment = 'pictureFlora');
  }

  segmentChanged(ev: any) {
    this.currentSegment =
      this.currentSegment == 'pictureFlora' ? ev.target.value : 'generalFlora';
  }

  addPhotoToGallery = async (category: string) => {
    const photo: Photo = await this._photo.addNewToGallery(this.key, category);

    if (photo && this._general.objectNotEmpty(photo)) {
      switch (category) {
        case 'fullheight':
          this.fullheight.push(photo);
          break;
        case 'immediate_vicinity':
          this.immediate_vicinity.push(photo);
          break;
        case 'leaves':
          this.leaves.push(photo);
          break;
        case 'trunk':
          this.trunk.push(photo);
          break;
        case 'fruit':
          this.fruit.push(photo);
          break;
        case 'roots':
          this.roots.push(photo);
          break;
        case 'west_left':
          this.west_left.push(photo);
          break;
        case 'east_right':
          this.east_right.push(photo);
          break;
        default:
          break;
      }
    }
  };

  submitGeneralForm() {
    const date_encoded: string = this.datepipe.transform(
      new Date().getTime(),
      'YYYY-MMM-dd HH:mm:ss'
    );

    const flora: any = {
      appId: this.key || new Date().getTime(),
      common_name: this.common_name,
      kingdom: this.kingdom,
      family: this.family,
      genus: this.genus,
      species: this.species,
      sub_species: this.sub_species,
      varieta_and_infra_var_name: this.varieta_and_infra_var_name,
      taxonomic_group: this.taxonomic_group,
      description: this.description,
      barangay: this.barangay,
      sitio: this.sitio,
      fullheight: this.fullheight || [],
      immediate_vicinity: this.immediate_vicinity || [],
      leaves: this.leaves || [],
      fruit: this.fruit || [],
      trunk: this.trunk || [],
      roots: this.roots || [],
      west_left: this.west_left || [],
      east_right: this.east_right || [],
      longitude: this.longitude || 0,
      latitude: this.latitude || 0,
      date_encoded: date_encoded || '0/0/0000',
    };

    this._currentPatrol.add(flora, AuthConstants.FLORAS, () => {
      this.loadingData('Success', 'Flora Added Successfully');
      this._photo.photos = [];
      this.modalDismiss();
    });
  }

  async loadingData(header: string, message: string) {
    try {
      const toast: any = await this._toast.create({
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
      const toast: any = await this._toast.create({
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
    return this._modal.dismiss();
  }

  private _deletePhoto(photos: Photo[], key: number): Photo[] {
    photos.splice(key, 1);
    return photos;
  }

  deletePhoto = (photo: Photo, key: number) => {
    switch (photo.category) {
      case 'fullheight':
        this.fullheight = this._deletePhoto(this.fullheight, key);
        break;
      case 'immediate_vicinity':
        this.immediate_vicinity = this._deletePhoto(
          this.immediate_vicinity,
          key
        );
        break;
      case 'leaves':
        this.leaves = this._deletePhoto(this.leaves, key);
        break;
      case 'fruit':
        this.fruit = this._deletePhoto(this.fruit, key);
        break;
      case 'trunk':
        this.trunk = this._deletePhoto(this.trunk, key);
        break;
      case 'roots':
        this.roots = this._deletePhoto(this.roots, key);
        break;
      case 'west_left':
        this.west_left = this._deletePhoto(this.west_left, key);
        break;
      case 'east_right':
        this.east_right = this._deletePhoto(this.east_right, key);
        break;
      default:
        break;
    }
  };

  async setFocus(nextElement: any) {
    nextElement.focus();
  }

  selectLibraryCallback(library: Library) {
    const {
      common_name,
      family,
      taxonomic_group,
      genus,
      species,
      sub_species,
      varieta_and_infra_var_name,
    }: Library = library;

    this.common_name = common_name;
    this.family = family;
    this.taxonomic_group = taxonomic_group;
    this.genus = genus;
    this.species = species;
    this.sub_species = sub_species;
    this.varieta_and_infra_var_name = varieta_and_infra_var_name;
  }

  async fromLibrary() {
    const modal: any = await this._modal.create({
      cssClass: 'modal-fullscreen',
      component: LibrarySearchModalPage,
      componentProps: {
        selectLibraryCallback: this.selectLibraryCallback.bind(this),
      },
    });

    modal.present();
  }
}
