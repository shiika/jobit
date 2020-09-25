import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swiper from "swiper/bundle";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', "../../assets/scss/media/_home.scss"]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        type: "bullets"
      },

      speed: 700

    });

    const testiSwiper = new Swiper(".swiper-container-2", {
      slidesPerView: "auto",
      spaceBetween: 30,
      // autoplay: {
      //   delay: 3000
      // }
    });

    // mySwiper.init();
  }

}
