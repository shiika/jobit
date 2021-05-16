import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { WorkComponent } from './work.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LayoutModule } from "@angular/cdk/layout";
import { MatCardModule } from "@angular/material/card";
import { JobComponent } from './job/job.component';
import { MatChipsModule } from "@angular/material/chips";
import { JobDescComponent } from './job-desc/job-desc.component';
import { QuestionsComponent } from './questions/questions.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input"; 
import { JobRequirementsComponent } from './job-requirements/job-requirements.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { ExperienceComponent } from './experience/experience.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [WorkComponent, JobComponent, JobDescComponent, QuestionsComponent, JobRequirementsComponent, JobsComponent, JobSeekerComponent, ExperienceComponent ],
  imports: [
    CommonModule,
    WorkRoutingModule,
    MatTabsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    ReactiveFormsModule
  ],

  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class WorkModule { }
