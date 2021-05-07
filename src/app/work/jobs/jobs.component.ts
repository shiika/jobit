import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Job } from 'src/app/core/models/job.model';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  tabs: string[] = ["Explore", "Applications"];

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
  constructor() { }

  ngOnInit(): void {
  }

}
