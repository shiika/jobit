import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDesc, JobApp } from 'src/app/core/models/job.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  tabs: string[] = ["Saved Jobs"];
  $saved: Observable<JobDesc[]>;
  isMobile: boolean = false;

  applications: any[] = Array.from({length: 2}, (item, index) => index);
  constructor(private data: DataService, private mediaMatcher: MediaMatcher) { }

  ngOnInit(): void {
    let viewport = this.mediaMatcher.matchMedia("(max-width: 767.98px)");
    this.isMobile = viewport.matches;
    viewport.addEventListener("change", e => {
      this.isMobile = e.matches;
    });

    this.$saved = this.data.$saved;
    this.data.getSaved().subscribe();
  }
}
