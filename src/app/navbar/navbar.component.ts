import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', "../../assets/scss/media/_navbar.scss"],
  animations: [
    trigger("navbarCollapse", [
      state("collapseStart", style({
        opacity: 0
      })),

      state("collapseEnd", style({
        opacity: 1
      })),
      transition(":enter, :leave", [
        animate("0.5s")
      ]),
    ]
    ),
    trigger("buttonsAnimation", [
      transition(":enter", [
        query(".navbar-nav .nav-item button, .navbar-nav .nav-item a", [
          style({
            opacity: 0,
            transform: "translateX(30px)"
          }),
          stagger(50, [
            animate("0.5s", style({
              opacity: 1,
              transform: "translateX(0px)"
            }))
          ])
        ],
        ),
      ]),
      transition(":leave", [
        query(".navbar-nav .nav-item button, .navbar-nav .nav-item a", [
          style({
            opacity: 1,
            transform: "translateX(0px)"
          }),
          stagger(50, [
            animate("0.5s", style({
              opacity: 0,
              transform: "translateX(30px)"
            }))
          ])
        ],
        ),
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = false;
  collapseTrans: boolean = false;

  constructor() { }

  ngOnInit(): void {
    window.innerWidth >= 992 ? this.isCollapsed = true : this.isCollapsed = false;
  }

  toggleNavbar(): void {

  } 

}
