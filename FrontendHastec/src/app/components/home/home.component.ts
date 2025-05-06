import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        navigation: true,
        pagination: { clickable: true },
        autoplay: {
          delay: 4000, // Cambia cada 4 segundos
          disableOnInteraction: false, // Sigue autoplay aunque toquen botones
        },
        loop: true, // Para que regrese al primer slide al terminar
      });
    }
  }

}
