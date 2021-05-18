import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Experience } from 'src/app/core/models/experience.interface';
import { Education } from 'src/app/core/models/education.interface';
import { SeekerService } from 'src/app/shared/services/seeker.service';
import { Seeker } from "../core/models/seeker.interface";
import { ExperienceComponent } from '../work/experience/experience.component';
import { EducationComponent } from '../work/education/education.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobSeekerComponent implements OnInit {
  seeker: Seeker;
  isMe: boolean;
  $experiences: Observable<Experience[]>;
  $education: Observable<Education[]>;
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute, 
    private dialog: MatDialog, 
    private seekerService: SeekerService,
    private mediaMatcher: MediaMatcher) { }

  ngOnInit(): void {
    const seekerId = this.route.snapshot.params["id"];
    this.isMe = !!!seekerId;
    console.log(this.isMe);
    if (this.isMe) {
      this.$experiences = this.seekerService.getExp(null);
      this.$education = this.seekerService.getEdu(null);
      this.route.data
        .subscribe(
          (data: {[key: string]: any}) => {
            this.seeker = {...data.profile, skills: data.skills, langs: data.langs};
          }
        );
      
        let viewport = this.mediaMatcher.matchMedia("(max-width: 767.98px)");
        this.isMobile = viewport.matches;
        viewport.addEventListener("change", e => {
          this.isMobile = e.matches;
        });
    } else {
      this.$experiences = this.seekerService.getExp(seekerId);
      this.$education = this.seekerService.getEdu(seekerId);
      this.route.data
        .subscribe(
          (data: {[key: string]: any}) => {
            this.seeker = {...data.profile, skills: data.skills, langs: data.langs};
          }
        );
      
        let viewport = this.mediaMatcher.matchMedia("(max-width: 767.98px)");
        this.isMobile = viewport.matches;
        viewport.addEventListener("change", e => {
          this.isMobile = e.matches;
        });
    }
  }

  toggleExp(): void {
    const dialogRef = this.dialog.open(ExperienceComponent, {
      width: "900px"
    });
  }

  toggleEdu(): void {
    const dialogRef = this.dialog.open(EducationComponent, {
      width: "900px"
    });
  }

  removeExp(id: number): void {
    this.seekerService.removeExp(id).subscribe();
  }

}
