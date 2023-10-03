import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { ValidationViewModalPage } from '../modals/validation-view-modal/validation-view-modal.page';
import { NetworkService } from 'src/app/services/network.service';
import { UserService } from 'src/app/services/storage/user.service';
import { Network } from 'src/app/types/general.type';
import { DataProviderMeta, LiveFlora, User } from 'src/app/types/live.type';
import { SettingsService } from 'src/app/services/storage/settings.service';

@Component({
	selector: 'app-validation',
	templateUrl: './validation.page.html',
	styleUrls: ['./validation.page.scss'],
})
export class ValidationPage implements OnInit {
	tree: LiveFlora[] = [];
	message: string = 'Loading...';
	currentPage: number = 1;
	pageCount: number = 1;
	perPage: number = 20;
	totalCount: number = 0;
	floraValidation: string = "";

	constructor(
		private _modal: ModalController,
		private _http: HttpService,
		private _loading: LoadingController,
		private _network: NetworkService,
		private _user: UserService,
		private settingService: SettingsService
	) { }

	isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	ngOnInit() {
		this.showInitLoading();
	}

	async showInitLoading() {
		const network: Network = await this._network.getNetwork();
		if (network.connected) {
			const loading: any = await this._loading.create({
				message: 'Loading Validation Trees...',
			});
			loading.present();
			this.getValidationTrees(() => { this._loading.dismiss() })
		}
		else {
			this.message = 'No internet';
		}
	}



	getValidationTrees(callback: Function = (() => { }), page: number = 1) {
		const { id, access_token }: User = this._user.user.value;
		this._http.get('tree', {
			"access-token": access_token,
			"user_id": id,
			"page": page,
			"sort": "common_name",
			"keywords": this.floraValidation,
			"status": 0,
		})
			.subscribe((res: any) => {
				if (res && res.status) {
					const { tree, _meta }: { tree: LiveFlora[], _meta: DataProviderMeta } = res.data;
					if (page > 1) {
						const data: LiveFlora[] = this.tree.concat(tree);
						this.tree = data;
					}
					else {
						this.tree = tree;
						if (tree.length > 0) {
							this.message = '';
						} else {
							this.message = 'No data found';
						}
					}
					this.setMetaData(_meta);
				}
				callback();
			}, (error) => {
				this.message = error.message;
				callback();
			})
	}

	handleChange(event: any) {
		this.getValidationTrees()
	}

	handleRefresh(event: any) {
		this.showInitLoading();
		event.target.complete();
	}

	setMetaData({ currentPage, totalCount, perPage, pageCount }: DataProviderMeta) {
		this.currentPage = currentPage;
		this.totalCount = totalCount;
		this.perPage = perPage;
		this.pageCount = pageCount;
	}

	showLoading(): boolean {
		return this.currentPage < this.pageCount;
	}

	loadData(event: any) {
		setTimeout(() => {
			if (this.currentPage < this.pageCount) {
				this.getValidationTrees(() => {
					event.target.complete();
				}, this.currentPage + 1);
			} else {
				event.target.disabled = true;
			}
		}, 500)
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

	async goToValidationViewModal(param: any) {
		const modal: any = await this._modal.create({
			cssClass: "modal-fullscreen",
			component: ValidationViewModalPage,
			animated: true,
			componentProps: param
		});
		modal.present();
	}
}