import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { MatDrawer } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { Job } from "../shared/models/job.model";
import * as moment from "moment";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
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
        animate("0.4s ease-out", style({
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
export class WorkComponent implements OnInit {
  @ViewChild("sidenav", {static: false}) sidenav: MatDrawer;
  opened: boolean = false;
  isToggled: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = false;
  tabs: string[] = ["Explore", "Applications"];
  sidenavLinks: {[key: string]: string}[] = [
    {
      icon: "home",
      link: "Home"
    },
    {
      icon: "chat",
      link: "Messaging"
    },
    {
      icon: "bookmark",
      link: "Saved"
    },
  ];

  jobs: Job[] = [
    {
      companyName: "Instagram",
      title: "Frontend Developer",
      publishDate: moment("20201009", "YYYYMMDD").fromNow(),
      image: "../assets/SVG/Instagram.svg",
      skills: ["HTML", "CSS", "Javascript", "Bootstrap", "AJAX"]
    },
    {
      companyName: "Youtube",
      title: "Software Engineer",
      publishDate: moment("20201231", "YYYYMMDD").fromNow(),
      image: "../assets/SVG/001-youtube.svg",
      skills: ["Angular", "Nodejs", "Database Design", "Python"]
    },
    {
      companyName: "LinkedIn",
      title: "Database Engineer",
      publishDate: moment("20201002", "YYYYMMDD").fromNow(),
      image: "../assets/SVG/027-linkedin.svg",
      skills: ["Database Design", "MySql", "SQL", "Python", "RestApi"]
    },
    {
      companyName: "twitter",
      title: "Accounting Manager",
      publishDate: moment("20210110", "YYYYMMDD").fromNow(),
      image: "../assets/SVG/008-twitter.svg",
      skills: ["Accounting", "Finance", "Budgetting", "CFA"]
    },
    {
      companyName: "Medium",
      title: "Sales Manager",
      publishDate: moment("20201111", "YYYYMMDD").fromNow(),
      image: `../assets/SVG/026-medium.svg`,
      skills: ["Computer Skills", "Microsoft Excel", "Microsoft Office", "Sales Rep"]
    },
  ]

  applications: any[] = Array.from({length: 2}, (item, index) => index);

  constructor(private mediaMatcher: MediaMatcher) {}

  ngOnInit(): void {
    let viewport = this.mediaMatcher.matchMedia("(max-width: 767.98px)");
    let tabletView = this.mediaMatcher.matchMedia("(max-width: 991.98px)");
    this.isMobile = viewport.matches;
    this.isTablet = tabletView.matches;
    viewport.addEventListener("change", e => {
      this.isMobile = e.matches;
    });
    tabletView.addEventListener("change", e => {
      this.isTablet = e.matches;
    });
  }

  onHover(isMobile: boolean) {
    if (!isMobile) {
      this.isToggled = !this.isToggled;
    }
  }

}
