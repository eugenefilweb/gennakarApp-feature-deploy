import { Component, OnInit, Input } from '@angular/core';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Router } from '@angular/router';
import { FileSystemService } from 'src/app/services/file-system.service';
import { CurrentPatrol } from 'src/app/types/general.type';
import { CurrentPatrolService } from 'src/app/services/storage/current-patrol.service';
import { UserService } from 'src/app/services/storage/user.service';
import { User } from 'src/app/types/live.type';
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit {
  @Input() title: string;
  current_patrol: CurrentPatrol;
  user: User;
  userPhotoIcon: string = AuthConstants.DEFAULT_IMAGE;
  timestamp: string = '';
  constructor(
    public _router: Router,
    public _file: FileSystemService,
    public _currentPatrol: CurrentPatrolService,
    public _user: UserService
  ) {
    this._currentPatrol.patrol.subscribe((patrol: CurrentPatrol) => {
      this.current_patrol = patrol;
    });
    this._currentPatrol.patrolTimestamp.subscribe((timestamp: string) => {
      this.timestamp = timestamp;
    });

    this._user.user.subscribe((user: User) => {
      this.user = user;

      this._file.downloadImageFromLink(user.userPhotoIcon, (base64: string) => {
        this.userPhotoIcon = base64;
      });
    });
  }

  ngOnInit() {}

  togglePatrol() {
    if (!this.current_patrol.status) {
      this._currentPatrol.selectWatershed();
    } else {
      this._currentPatrol.end(() => {
        this._router.navigate(['/tabs/patrol-history']);
      });
    }
  }
}
