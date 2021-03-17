import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobDescComponent } from './job-desc/job-desc.component';
import { JobRequirementsComponent } from './job-requirements/job-requirements.component';
import { QuestionsComponent } from './questions/questions.component';
import { WorkComponent } from './work.component';

const routes: Routes = [

  {
    path: "", component: WorkComponent, children: [
      {
        path: "explore/:id", component: JobDescComponent, children: [
          {
            path: "", component: JobRequirementsComponent
          },
          {
            path: "questions", component: QuestionsComponent
          }

        ]
      },
      {
        path: "applications/:id", component: JobDescComponent
      }
    ]
  },

  // {
  //   path: "jobs", component: WorkComponent, children: [
  //     {
  //       path: ":id", component: WorkComponent
  //     },
  //     {
  //       path: ":id/edit", component: WorkComponent
  //     },
  //     {
  //       path: ":id/delete", component: WorkComponent
  //     },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
