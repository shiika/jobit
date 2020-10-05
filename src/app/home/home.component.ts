import { Component, OnInit} from '@angular/core';
import Swiper from "swiper/bundle";
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', "../../assets/scss/media/_home.scss"],
  animations: [
    trigger("overlayAnimation", [
      transition(":enter", [
        query(".loading-transition__item", [
          style({
            transform: "scaleX(1)"
          }),
          stagger(300, [
            animate("0.8s cubic-bezier(1,.01,0,1.04)", style({
              transform: "scaleX(0)"
            })
            )
          ])
        ])
      ])
    ]),
    trigger("textAnimation", [
      transition(":enter", [
        query(".home__heading__desc > *:not(h3)", [
          style({
            transform: "translateX(-30%)",
            opacity: 0
          }),
          stagger(70, [
            animate("0.4s 0.9s ease-in", style({
              transform: "translateX(0)",
              opacity: 1
            }))
          ])
        ])
      ])
    ]),
    trigger("headingAnimation", [
      transition(":enter", [
        query(".home__heading__desc h3", [
          style({
            transform: "translateY(-100%)"
          }),
          animate("0.3s 0.9s ease-in", style({
            transform: "translateY(0)"
          }))
        ])
      ]),
    ]),
    trigger("imgAnimation", [
      transition(":enter", [
        query(".home__heading__img .img-container", [
          style({
            transform: "translateY(30%)",
            opacity: 0
          }),
          animate("0.8s 1.3s cubic-bezier(.75,-0.5,0,1.75)", style({
            transform: "translateX(0)",
            opacity: 1
          }))
        ])
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  isActive: boolean = true;
  headingState = "slideUp";

  constructor() { }

  ngOnInit(): void {
    this.headingState = "slideDown";
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

      speed: 500

    });

    const testiSwiper = new Swiper(".swiper-container-2", {
      slidesPerView: "auto",
      spaceBetween: 20,
      // autoplay: {
      //   delay: 3000
      // }
    });
    
  }
}
