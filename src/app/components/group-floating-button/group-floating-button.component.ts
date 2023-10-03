import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormCategoryFaunaPage } from 'src/app/pages/form-category-fauna/form-category-fauna.page';
import { FormCategoryFloraPage } from 'src/app/pages/form-category-flora/form-category-flora.page';
import { EnvironmentalIncidentModalPage } from 'src/app/pages/modals/environmental-incident-modal/environmental-incident-modal.page';
import { PatrolHistoryDetailsPage } from 'src/app/pages/patrol-history-details/patrol-history-details.page';
import { GeneralService } from 'src/app/services/general.service';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { CurrentPatrol } from 'src/app/types/general.type';

@Component({
  selector: 'app-group-floating-button',
  templateUrl: './group-floating-button.component.html',
  styleUrls: ['./group-floating-button.component.scss'],
})
export class GroupFloatingButtonComponent implements OnInit {
  public current_patrol: CurrentPatrol;

  constructor(
    private _currentPatrol: CurrentPatrolService,
    private _modal: ModalController,
    private _general: GeneralService,
  ) {
    this._currentPatrol.patrol.subscribe((patrol: CurrentPatrol) => {
      this.current_patrol = patrol;
    });
  }

  ngOnInit() {}

  async modalDetails(params: any) {
    const modal: any = await this._modal.create({
      cssClass: 'modal-fullscreen',
      component: PatrolHistoryDetailsPage,
      componentProps: params,
    });

    modal.present();
  }

  async modalReport() {
    const modal: any = await this._modal.create({
      component: EnvironmentalIncidentModalPage,
    });
    return await modal.present();
  }

  async modalFlora() {
    const modal: any = await this._modal.create({
      component: FormCategoryFloraPage,
    });
    modal.present();
  }

  async modalFauna() {
    const modal: any = await this._modal.create({
      component: FormCategoryFaunaPage,
    });
    modal.present();
  }

  async viewDetails(patrol: CurrentPatrol) {
    this.modalDetails({
      tripId: patrol.timestamp,
      watershed: patrol.watershed,
      createdAt: this._general.formatDateTime(patrol.timestamp),
      floras: patrol.floras,
      faunas: patrol.faunas,
      totalDistance: patrol.distance,
      travelHours: this._general.formatMilliseconds(
        new Date().getTime() - patrol.timestamp
      ),
      coordinates: patrol.coordinates,
      statusLabel: patrol.syncStatus,
      statusClass: patrol.syncStatus == 'Ongoing' ? 'primary' : 'warning',
      isCurrentPatrol: true,
    });
  }


  addForm(selectCategory: string) {
    this._currentPatrol.addForm(selectCategory);
  }


}
