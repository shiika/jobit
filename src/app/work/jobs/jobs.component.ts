import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Observable } from 'rxjs';
import { Job, JobApp, JobDesc, JobPost } from 'src/app/core/models/job.model';
import { DataService } from 'src/app/shared/services/data.service';
import { SeekerService } from 'src/app/shared/services/seeker.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  tabs: string[] = ["Explore", "Applications"];
  $jobs: Observable<JobDesc[]>;
  $apps: Observable<JobApp[]>;
  isMobile: boolean = false;
  saved: JobDesc[] = [];

  applications: any[] = Array.from({length: 2}, (item, index) => index);
  constructor(private data: DataService, private mediaMatcher: MediaMatcher) { }

  ngOnInit(): void {
    let viewport = this.mediaMatcher.matchMedia("(max-width: 767.98px)");
    this.isMobile = viewport.matches;
    viewport.addEventListener("change", e => {
      this.isMobile = e.matches;
    });

    this.$jobs = this.data.$jobs;
    this.data.getJobs("all").subscribe(jobs => {
    });
    this.data.getApps().subscribe(apps => {});
    this.data.getSaved().subscribe(
      (saved: JobDesc[]) => {
        this.saved = saved;
      }
    )
  }

  tabChanged(event: any): void {
    this.$apps = this.data.getApps()
  }

  selectTab(tab: string): Observable<any[]> {
    if (tab == "Explore") {
      return this.$jobs
    } else {
      return this.$apps
    }
  }

  checkSaved(id: number): boolean {
    return this.saved.findIndex(job => {
      return id == job.ID
    }) != -1
  }

}
