import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalController } from '@ionic/angular';
import { LibraryViewPage } from '../library-view/library-view.page';
import { LoadingController } from '@ionic/angular';
import { IonSearchbar } from '@ionic/angular';
import { NetworkService } from 'src/app/services/network.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { UserService } from 'src/app/services/storage/user.service';
import { LibraryService } from 'src/app/services/storage/library.service';
import { Network } from 'src/app/types/general.type';
import { DataProviderMeta, Library, User } from 'src/app/types/live.type';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  @ViewChild('mySearchBar', { static: false }) searchBar: IonSearchbar;

  libraries: Library[] = [];
  message: string = 'Loading...';

  currentPage: number = 1;
  pageCount: number = 1;
  perPage: number = 20;
  totalCount: number = 0;

  currentSegment: string = 'flora';

  librarySearch: string = '';
  network: Network;

  constructor(
    private _http: HttpService,
    private _loading: LoadingController,
    private _modal: ModalController,
    private _network: NetworkService,
    private _user: UserService,
    private _library: LibraryService
  ) {
    this._network.network.subscribe((network: Network) => {
      this.network = network;
      if (!network.connected) {
        this.message = 'No Internet';
      } else {
        this.message = '';
      }
    });
  }

  handleRefresh(event: any) {
    this.showInitLoading(() => {
      this.getLibrary(() => {
        event.target.complete();
        this._loading.dismiss();
      });
    });
  }

  async showInitLoading(callback: Function = () => {}) {
    const loading = await this._loading.create({
      spinner: 'circles',
    });

    loading.present();

    callback();
  }

  ngOnInit() {
    this.showInitLoading(() => {
      this.getLibrary(() => {
        this._loading.dismiss();
      });
    });
  }

  async getLibrary(callback: Function = () => {}, page: number = 1) {
    const network: Network = await this._network.getNetwork();
    if (network.connected) {
      const { access_token }: User = this._user.user.value;
      this._http
        .get('library', {
          'access-token': access_token,
          page: page,
          sort: 'common_name',
          keywords: this.librarySearch,
          'per-page': 500,
        })
        .subscribe(
          (libraries: any) => {
            if (libraries && libraries.status) {
              const {
                library,
                _meta,
              }: { library: Library[]; _meta: DataProviderMeta } =
                libraries.data;

              if (page > 1) {
                const data: Library[] = this.libraries.concat(library);

                this.libraries = data;
                this._library.set(data);
              } else {
                this.libraries = library;
                this._library.set(library);

                if (library.length > 0) {
                  this.message = '';
                } else {
                  this.message = 'No data found';
                }
              }

              this.setMetaData(_meta);
            }

            callback();
          },
          (error: any) => {
            this.message = error.message;
            callback();
          }
        );
    } else {
      this._library.get((libraries: Library[]) => {
        this.libraries = libraries;
        callback();
      });
    }
  }

  extractFilename = (path: string): string => {
    const pathArray: string[] = path.split('/');
    const lastIndex: number = pathArray.length - 1;
    return pathArray[lastIndex];
  };

  mainPhoto(liveUrl): string {
    if (this.network.connected) {
      return liveUrl;
    }
    return AuthConstants.DEFAULT_IMAGE;
  }

  setMetaData({
    currentPage,
    totalCount,
    perPage,
    pageCount,
  }: DataProviderMeta) {
    this.currentPage = currentPage;
    this.totalCount = totalCount;
    this.perPage = perPage;
    this.pageCount = pageCount;
  }

  showLoading(): boolean {
    return this.currentPage < this.pageCount;
  }

  loadData(event: any) {
    if (this.currentPage < this.pageCount) {
      this.getLibrary(() => {
        event.target.complete();
      }, this.currentPage + 1);
    } else {
      event.target.disabled = true;
    }
  }

  async libraryView(params: any) {
    const modal: any = await this._modal.create({
      cssClass: 'modal-fullscreen',
      component: LibraryViewPage,
      componentProps: params,
    });

    modal.present();
  }

  segmentChanged(ev: any) {
    this.currentSegment = ev.target.value;
  }

  navigateTo2(ev: any) {
    this.currentSegment = ev.target.value;
  }
}
