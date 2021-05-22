import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Job, JobApp } from 'src/app/core/models/job.model';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger("cardHover", [
      state("in", style({
        transform: "scale(1.02)"
      })),
      state("out", style({
        transform: "scale(1)"
      })),

      transition("in <=> out, * => active", [
        animate("0.1s ease-in-out")
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  @Input("app") app: JobApp;
  isSaved: boolean = false;
  cardState: string = "out";

  constructor() { }

  ngOnInit(): void {
    // this.job.publishDate = moment(this.job.publishDate).fromNow();

  }

  get publishDate(): string {
    return moment(this.app.app.publishDate).fromNow()
  }

  onCardChange(state: string) {
    this.cardState = state;
  }

}
