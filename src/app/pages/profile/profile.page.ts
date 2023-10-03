import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { FileSystemService } from 'src/app/services/file-system.service';
import { UserService } from 'src/app/services/storage/user.service';
import { User } from 'src/app/types/live.type';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	firstname: string;
	lastname: string;
	position: string;
	userPhotoLink: string;
	lastname_initial: string;

	constructor(
		private _alert: AlertController,
		private _auth: AuthService,
		private _file: FileSystemService,
		private _user: UserService,
	) {
		this._user.user.subscribe((user: User) => {
			this._file.downloadImageFromLink(user.userPhotoLink, (base64: string) => {
				this.userPhotoLink = base64;
			});

			this.firstname = user.firstname;
			this.lastname = user.lastname;
			this.lastname_initial = user.lastname_initial;
			this.position = user.position;
		});
	}

	ngOnInit() {
	};

	logout() {
		this.presentAlert();
	};

	async presentAlert() {
		const alert: any = await this._alert.create({
			header: 'Logout?',
			message: 'Please confirm your action',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
					},
				},
				{
					text: 'OK',
					role: 'confirm',
					handler: () => {
						this._auth.logout();
					},
				},
			],
		});

		await alert.present();
	}
}
