import { Component, OnInit, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';
import Swiper, { Navigation, Pagination, Scrollbar, } from 'swiper';
@Component({
  selector: 'app-flora-images-view',
  templateUrl: './flora-images-view.component.html',
  styleUrls: ['./flora-images-view.component.scss'],
})
export class FloraImagesViewComponent implements OnInit {
  @Input() title: string = '';
  @Input() photos: string[] = [];
  @Input() swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 5,
    cssMode: true,
    navigation: true,
   
  };

  ngOnInit() { }
  
}
