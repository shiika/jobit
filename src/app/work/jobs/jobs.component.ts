import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Observable } from 'rxjs';
import { Job, JobDesc, JobPost } from 'src/app/core/models/job.model';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  tabs: string[] = ["Explore", "Applications"];
  $jobs: Observable<JobDesc[]>;

  jobs: JobDesc[];

  applications: any[] = Array.from({length: 2}, (item, index) => index);
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.$jobs = this.data.$jobs;
    this.data.getJobs("all").subscribe(jobs => {
      console.log(jobs)
    })
  }

}
