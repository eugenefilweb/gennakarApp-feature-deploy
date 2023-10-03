import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dismiss-button',
  templateUrl: './dismiss-button.component.html',
  styleUrls: ['./dismiss-button.component.scss'],
})
export class DismissButtonComponent implements OnInit {

  constructor( private modalController: ModalController) { }

  ngOnInit() { }
  
  modalDismiss() {
    this.modalController.dismiss();
  }

}
