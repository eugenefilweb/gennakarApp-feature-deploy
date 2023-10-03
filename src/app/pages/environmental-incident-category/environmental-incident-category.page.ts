import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-environmental-incident-category',
  templateUrl: './environmental-incident-category.page.html',
  styleUrls: ['./environmental-incident-category.page.scss'],
})
export class EnvironmentalIncidentCategoryPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }


  modalDismiss() {
    this.modalController.dismiss();
  }
}
