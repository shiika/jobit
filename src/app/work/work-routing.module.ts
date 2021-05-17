import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobDescComponent } from './job-desc/job-desc.component';
import { JobRequirementsComponent } from './job-requirements/job-requirements.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { JobsComponent } from './jobs/jobs.component';
import { QuestionsComponent } from './questions/questions.component';
import { WorkComponent } from './work.component';
import { ProfileResolverService } from "../shared/services/resolvers/profile.resolver.service";
import { SkillsResolverService } from "../shared/services/resolvers/skills-resolver.service";
import { LangsResolverService } from "../shared/services/resolvers/langs-resolver.service";
import { SeekerGuard } from '../core/guards/seeker.guard';

const routes: Routes = [

  {
    path: "", component: WorkComponent, canActivate: [SeekerGuard], children: [
      {
        path: "me", 
        component: JobSeekerComponent,
        resolve: { 
          profile: ProfileResolverService,
          skills: SkillsResolverService,
          langs: LangsResolverService,
        }
      },
      {
        path: "explore", component: JobsComponent, children: [
          {
            path: ":id", component: JobDescComponent, children: [
              {
                path: "", component: JobRequirementsComponent
              },
              {
                path: "questions", component: QuestionsComponent
              }
    
            ]
          }
        ]
      },
      {
        path: "explore-mob", children: [
          {
            path: "", component: JobsComponent
          },
          {
            path: ":id", component: JobDescComponent, children: [
              {
                path: "", component: JobRequirementsComponent
              },
              {
                path: "questions", component: QuestionsComponent
              }
    
            ]
          }
        ]
      },
      {
        path: "applications/:id", component: JobDescComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
