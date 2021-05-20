import { Component, OnInit } from '@angular/core';
import { JobDesc } from 'src/app/core/models/job.model';
import { EmpService } from 'src/app/shared/services/emp.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: JobDesc[] = [];


  constructor(private employer: EmpService) { }

  ngOnInit(): void {
    this.employer.getJobs()
      .subscribe(
        (jobs: JobDesc[]) => {
          console.log(jobs);
          this.jobs = jobs;
        }
      )
  }

}
