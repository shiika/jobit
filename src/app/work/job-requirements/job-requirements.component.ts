import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { JobDesc } from 'src/app/core/models/job.model';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-job-requirements',
  templateUrl: './job-requirements.component.html',
  styleUrls: ['./job-requirements.component.scss']
})
export class JobRequirementsComponent implements OnInit {
  skills: string[] = [ "UX", "Angular", "Typescript", "Git", "2-3 Experience" ];
  requirements: string[] = Array.from({length: 6}, (item, i) => `i`);
  job: JobDesc = {
    ID: 1,
    companyName: "",
    title: "",
    publishDate: "",
    location: "Silicon Valley",
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
    this.route.params
    .pipe(
      concatMap(data => {
        this.job = {...this.data.getJob(+data["id"])};
        return this.data.getSkills(this.job.ID.toString())
      })
    )
    .subscribe(
      (skills: string[]) => {
        this.skills = skills;
      }
    );
  }

}
