import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapPage } from '../pages/map/map.page';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { CurrentPatrol, Patrol } from '../types/general.type';
@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

    currentPatrol: CurrentPatrol;
	patrols: Patrol[] = [];

    constructor(
        private modal: ModalController,
        private location: Location
    ) { }
 
    ngOnInit() { }


    async navigateMap() {
        // this.router.navigate(['/tabs/map'])
        setTimeout( async() => {
            const modal = await this.modal.create({
                component: MapPage,
                animated: true,
            })
            return modal.present();
        })
    }

}
