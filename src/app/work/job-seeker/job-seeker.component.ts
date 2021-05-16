import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Experience } from 'src/app/core/models/experience.interface';
import { Education } from 'src/app/core/models/education.interface';
import { SeekerService } from 'src/app/shared/services/seeker.service';
import { Seeker } from "../../core/models/seeker.interface";
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobSeekerComponent implements OnInit {
  seeker: Seeker;
  $experiences: Observable<Experience[]>;
  $education: Observable<Education[]>;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private seekerService: SeekerService) { }

  ngOnInit(): void {
    this.$experiences = this.seekerService.getExp();
    this.$education = this.seekerService.getEdu();
    this.route.data
      .subscribe(
        (data: {[key: string]: any}) => {
          this.seeker = {...data.profile, skills: data.skills, langs: data.langs};
        }
      )
  }

  toggleExp(): void {
    const dialogRef = this.dialog.open(ExperienceComponent, {
      width: "900px"
    });
  }

  removeExp(id: number): void {
    this.seekerService.removeExp(id).subscribe();
  }

}
