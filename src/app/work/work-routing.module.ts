import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobDescComponent } from './job-desc/job-desc.component';
import { JobRequirementsComponent } from './job-requirements/job-requirements.component';
import { JobsComponent } from './jobs/jobs.component';
import { QuestionsComponent } from './questions/questions.component';
import { WorkComponent } from './work.component';

const routes: Routes = [

  {
    path: "", component: WorkComponent, children: [
      // {
      //   path: "explore/:id", component: JobDescComponent, children: [
      //     {
      //       path: "", component: JobRequirementsComponent
      //     },
      //     {
      //       path: "questions", component: QuestionsComponent
      //     }

      //   ]
      // },
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
