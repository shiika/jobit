import { trigger, state, style, transition, group, query, animateChild, animate } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-emp-work',
  templateUrl: './emp-work.component.html',
  styleUrls: ['./emp-work.component.scss'],
  animations: [
    trigger("sidenavToggle", [
      state("open", style({
        width: "200px"
      })),
      transition("* <=> open", [
        group([
          query("@*", animateChild()),
          animate("0.3s ease-in"),
        ])
      ])
    ]),
    trigger("navlistToggle", [
      transition(":enter", [
        style({
          transform: "translateX(-15px)",
          opacity: 0
        }),
        animate("0.8s ease-out", style({
          transform: "translateX(0)",
          opacity: 1
        }))
      ]),
      transition(":leave", [
        style({
          transform: "translateX(0)",
          opacity: 1
        }),
        animate("0.4s ease-out", style({
          transform: "translateX(-15px)",
          opacity: 0
        }))
      ]),
    ]),

    trigger("iconToggle", [
      state("close", style({
        transform: "translateX(0)"
      })),
      state("open", style({
        transform: "translateX(7px)"
      })),
      transition("open <=> close", [
        animate("0.3s ease-out")
      ])
    ]),
    trigger("menuToggle", [
      state("close", style({
        transform: "rotate(0deg)"
      })),
      state("open", style({
        transform: "rotate(360deg)"
      })),
      transition("open <=> close", [
        animate("0.3s ease-in-out")
      ])
    ]),
  ]
})
export class EmpWorkComponent implements OnInit {
  @ViewChild("sidenav", {static: false}) sidenav: MatDrawer;
  isToggled: boolean = false;
  isMobile: boolean = false;
  sidenavLinks: {[key: string]: string}[] = [
    {
      icon: "home",
      text: "Home",
      link: "/home"
    },
    {
      icon: "business center",
      text: "Find",
      link: "/find/emps"
    },
    {
      icon: "add_circle",
      text: "Post Job",
      link: "/find/post"
    },
    {
      icon: "description",
      text: "Jobs",
      link: "/find/jobs"
    },
    {
      icon: "bookmark",
      text: "Saved",
      link: "/find/saved"
    },
  ];

  constructor(private mediaMatcher: MediaMatcher, private auth: AuthService) {}

  ngOnInit(): void {
    let viewport = this.mediaMatcher.matchMedia("(max-width: 767.98px)");
    this.isMobile = viewport.matches;
    viewport.addEventListener("change", e => {
      this.isMobile = e.matches;
    });
  }

  onHover(isMobile: boolean) {
    if (!isMobile) {
      this.isToggled = !this.isToggled;
    }
  }

  toggleNavbar(state: boolean): void {
    this.isToggled = state;
  }

  logout(): void {
    this.auth.logout();
  }

}
