import { ModalController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade, EffectCube } from 'swiper';

SwiperCore.use([
	Autoplay,
	Keyboard,
	Pagination,
	Scrollbar,
	Zoom,
	EffectFade,
	IonicSlides,
	EffectCube
]);

@Component({
	selector: 'app-library-view',
	templateUrl: './library-view.page.html',
	styleUrls: ['./library-view.page.scss'],
})
export class LibraryViewPage implements OnInit {

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

	constructor(private _modal: ModalController) { }

	ngOnInit() {
	}

	modalDismiss = () => {
		return this._modal.dismiss()
	};
}

