import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import SwiperCore, { Autoplay, Keyboard, Scrollbar, Zoom, EffectFade, EffectCube } from 'swiper';
import { SwiperOptions } from 'swiper';
SwiperCore.use([
  Autoplay, 
  Keyboard, 
  Scrollbar, 
  Zoom, 
  EffectFade, 
  IonicSlides, 
  EffectCube
]);

@Component({
  selector: 'app-validation-view-modal',
  templateUrl: './validation-view-modal.page.html',
  styleUrls: ['./validation-view-modal.page.scss'],
})
export class ValidationViewModalPage implements OnInit {

  common_name: string;
  description: string;
  kingdom: string;
  family: string;
  genus: string;
  species: string;
  longitude: number;
  latitude: number;
  distribution: string;
  sub_species: string;
  conservation_status: string;
  date: string;
  galleryUrl: string[];
  taxonomic_group: string;
  varieta_and_infra_var_name: string;
  residency_status: string;
  photoUrls: any;
 
  config: SwiperOptions = {
    pagination: true,
    slidesPerView: 'auto',
    spaceBetween: -1,
  } 
  currentSegment: string = 'fullheight';

  constructor(private modalController: ModalController, public _authService: AuthService) {}

  ngOnInit() {
  }

  modalDismiss = () => {
    this.modalController.dismiss()
  };
}
