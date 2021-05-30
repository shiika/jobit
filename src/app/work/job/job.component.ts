import { style, trigger, state, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Job, JobDesc, JobPost } from 'src/app/core/models/job.model';
import * as moment from "moment";
import { SeekerService } from 'src/app/shared/services/seeker.service';

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
  @Input("job") job: JobDesc;
  @Input("type") type: string;
  @Input("saved") isSaved: boolean = false;
  cardState: string = "out";

  constructor(private seeker: SeekerService) { }

  ngOnInit(): void {
    // this.job.publishDate = moment(this.job.publishDate).fromNow();

  }

  get publishDate(): string {
    return moment(this.job.publishDate).fromNow()
  }

  onCardChange(state: string) {
    this.cardState = state;
  }

  saveJob(event: Event, id: number): void {
    event.stopPropagation();
    this.seeker.saveJob(id)
      .subscribe(
        (res: string) => {
          this.isSaved = true;
        }
      )
  }

  unSave(e: Event, id: number): void {
    e.stopPropagation();
    this.seeker.unSaveJob(id)
      .subscribe(
        (res: string) => {
          this.isSaved = false;
          console.log(res);

        }
      )
  }

}
