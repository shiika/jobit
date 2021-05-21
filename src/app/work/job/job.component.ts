import { style, trigger, state, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Job, JobPost } from 'src/app/core/models/job.model';
import * as moment from "moment";

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
    // this.job.publishDate = moment(this.job.publishDate).fromNow();

  }

  get publishDate(): string {
    return moment(this.job.publishDate).fromNow()
  }

  onCardChange(state: string) {
    this.cardState = state;
  }

}
