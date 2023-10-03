import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { NetworkService } from 'src/app/services/network.service';
import { LibraryService } from 'src/app/services/storage/library.service';
import { Network } from 'src/app/types/general.type';
import { Library } from 'src/app/types/live.type';

@Component({
  selector: 'app-library-search-modal',
  templateUrl: './library-search-modal.page.html',
  styleUrls: ['./library-search-modal.page.scss'],
})
export class LibrarySearchModalPage implements OnInit {
  @ViewChild('mySearchBar', { static: false }) searchBar: IonSearchbar;

  libraries: Library[] = [];
  libraryModel: string = '';
  network: Network;
  selectLibraryCallback: Function = (() => { });
  message: string;

  constructor(
    private _modal: ModalController,
    private _network: NetworkService,
    private _library: LibraryService,
  ) {
    this._library.libraries.subscribe((libraries: Library[]) => {
      this.libraries = libraries;
    });
    this._network.network.subscribe((network: Network) => {
      this.network = network;
      this.message = network.connected ? '' : 'No internet';
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.searchBar.setFocus();
  }

  modalDismiss() {
    this._modal.dismiss();
  }

  selectLibrary(library) {
    this.selectLibraryCallback(library);
    this._modal.dismiss();
  }

  mainPhoto(liveUrl): string {
    if (this.network.connected) {
      return liveUrl;
    }
    return AuthConstants.DEFAULT_IMAGE;
  }

  handleRefresh(event: any) {
    this.getLibraries(() => {
      event.target.complete();
    });
  }

  async getLibraries(callback: Function = (() => { })) {
    this._library.load(callback, () => {
      this.message = 'No Internet';
    });
  }
}
