import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { EnvironmentalIncidentFormPage } from 'src/app/pages/modals/environmental-incident-form/environmental-incident-form.page';

@Component({
  selector: 'app-swiper-category',
  templateUrl: './swiper-category.component.html',
  styleUrls: ['./swiper-category.component.scss'],
})
  
export class SwiperCategoryComponent implements OnChanges, OnInit {
  @Input() public icon?: string;
  @Input() public title?: string;
  @Input() public category?: string;
  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private modal: ModalController
  ) {}

  public ngOnChanges(): void {
    if (!this.icon) {
      this.svgIcon = '';
      return;
    }
    this.httpClient.get(`assets/svg/${this.icon}.svg`, { responseType: 'text' }).subscribe((value) => {
      this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
    });
  }

  async viewEnvironmentalIncidentForm() {
    const modal = await this.modal.create({
      component: EnvironmentalIncidentFormPage,
      componentProps: { category: this.category }
    });
    return modal.present();
  }

  ngOnInit() {}
}
