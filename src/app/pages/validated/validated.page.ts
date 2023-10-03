import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { TreeService } from 'src/app/services/tree.service';
import { ValidationViewModalPage } from '../modals/validation-view-modal/validation-view-modal.page';
import { NetworkService } from 'src/app/services/network.service';
import { UserService } from 'src/app/services/storage/user.service';
import { Network } from 'src/app/types/general.type';
import { DataProviderMeta, LiveFlora, User } from 'src/app/types/live.type';

@Component({
	selector: 'app-validated',
	templateUrl: './validated.page.html',
	styleUrls: ['./validated.page.scss'],
})
export class ValidatedPage implements OnInit {
	tree: LiveFlora[] = [];
	currentPage: number = 1;
	pageCount: number = 1;
	perPage: number = 20;
	totalCount: number = 0;

	message: string = 'Loading...';
	floraValidated: string;

	constructor(
		private _tree: TreeService,
		private _modal: ModalController,
		private _loading: LoadingController,
		private _http: HttpService,
		private _network: NetworkService,
		private _user: UserService,
	) { }

	isEmpty(obj): boolean {
		return Object.keys(obj).length === 0;
	}

	ngOnInit() {
		this.showInitLoading();
	}

	async showInitLoading() {
		const network: Network = await this._network.getNetwork();

		if (network.connected) {
			const loading: any = await this._loading.create({
				message: 'Loading Validated Trees...',
			});

			loading.present();

			this.getValidatedTrees(() => { this._loading.dismiss() })

		}
		else {
			this.message = 'Oops, No Internet Connection';
		}
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
	getValidatedTrees(callback: Function = (() => { }), page: number = 1) {
		const { id, access_token }: User = this._user.user.value;

		this._http.get('tree', {
			"access-token": access_token,
			"user_id": id,
			"page": page,
			"status": 1
		})
			.subscribe((res: any) => {
				if (res && res.status) {
					const { tree, _meta }: { tree: LiveFlora[], _meta: DataProviderMeta } = res.data;
					if (page > 1) {
						const data: LiveFlora[] = this.tree.concat(tree);
						this.tree = data;
					} else {
						this.tree = tree;
						if (tree.length > 0) {
							this.message = '';
						}
						else {
							this.message = 'No data found';
						}
					}
					this.setMetaData(_meta);
				}

				callback();
			}, (error: any) => {
				this.message = error.message;
				callback();
			})
	}
	handleChange(event: any) {
		this.getValidatedTrees()
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
				this.currentPage = this.currentPage + 1;
				this._tree.getTreesDataValidated(this.currentPage);
				event.target.complete();
			} else {
				event.target.disable = true;
			}
		}, 500)
	}

	async goToValidatedViewModal(param: any) {
		const modal: any = await this._modal.create({
			cssClass: "modal-fullscreen",
			component: ValidationViewModalPage,
			animated: true,
			componentProps: param
		});

		modal.present();
	}
}