import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDesc } from 'src/app/core/models/job.model';
import { EmpService } from 'src/app/shared/services/emp.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: JobDesc[] = [];
  $empJobs: Observable<JobDesc[]>

  constructor(private employer: EmpService) { }

  ngOnInit(): void {
    this.$empJobs = this.employer.$empJobs;
    this.employer.getJobs()
      .subscribe(jobs => console.log(jobs));
  }

}
