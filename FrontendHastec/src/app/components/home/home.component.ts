import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit  } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      let currentSlide = 0;
      const slides = document.querySelectorAll('.carousel-image') as NodeListOf<HTMLImageElement>;

      setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 4000);
    }
  }


}
