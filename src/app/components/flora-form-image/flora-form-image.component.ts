import { Component, OnInit, Input } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { SettingsService } from 'src/app/services/storage/settings.service';
import { Photo } from 'src/app/types/general.type';
import { GeneralSetting, Settings } from 'src/app/types/live.type';

@Component({
  selector: 'app-flora-form-image',
  templateUrl: './flora-form-image.component.html',
  styleUrls: ['./flora-form-image.component.scss'],
})
export class FloraFormImageComponent implements OnInit {
  @Input() category: string = '';
  @Input() title: string = '';
  @Input() photos: Photo[] = [];
  @Input() addPhotoCallback: Function = ((category) => {});
  @Input() deleteCallback: Function = ((photo, key) => {});
  general: GeneralSetting;

  constructor(
    public photoService: PhotoService,
    private _settings: SettingsService,
    ) { 
    this._settings.settings.subscribe((settings: Settings) => {
      if (settings) {
        this.general = settings.general;
      }
    });
  }

  ngOnInit() {}

  updateFunction(category) {
    this.addPhotoCallback(category);
  }

  deleteFunction(photo, key) {
    this.deleteCallback(photo, key);
  }
}
