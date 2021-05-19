import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDesc, JobPost } from 'src/app/core/models/job.model';
import { DataService } from 'src/app/shared/services/data.service';
import * as moment from "moment";

@Component({
  selector: 'app-job-desc',
  templateUrl: './job-desc.component.html',
  styleUrls: ['./job-desc.component.scss']
})
export class JobDescComponent implements OnInit {
  job: JobDesc = {
    ID: 1,
    companyName: "",
    title: "",
    publishDate: "",
    location: "",
    experience_needed: 1,
    description: "",
    skills: [""],
    logo: "",
    type: "",
    vacancies: "",
    salary: "",
  };

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        this.job = {...this.data.getJob(+data["id"])};
        this.job.publishDate = moment(this.job.publishDate).fromNow();
      }
    )
  }

}
