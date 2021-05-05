import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpWorkComponent } from './emp-work.component';
import { EmployeesComponent } from "./employees/employees.component";
import { JobPostComponent } from './job-post/job-post.component';

const routes: Routes = [
    {
        path: "", component: EmpWorkComponent, children: [
          {
            path: "emps", component: EmployeesComponent
          },
          {
            path: "post", component: JobPostComponent
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpWorkRoutingModule { }
