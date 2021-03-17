import * as moment from "moment/moment";

import { style, trigger, state, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
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
export class JobComponent implements OnInit {
  @Input("job") job: Job;
  isSaved: boolean = false;
  cardState: string = "out";

  constructor() { }

  ngOnInit(): void {
    console.log(moment().format())
  }

  onCardChange(state: string) {
    this.cardState = state;
  }

}