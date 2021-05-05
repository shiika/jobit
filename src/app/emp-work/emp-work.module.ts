import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpWorkComponent } from './emp-work.component';
import { EmpWorkRoutingModule } from './emp-work-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { JobPostComponent } from './job-post/job-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from "@angular/material/slider"
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EmpService } from "../shared/services/emp.service";


@NgModule({
  declarations: [EmpWorkComponent, EmployeesComponent, EmployeeComponent, JobPostComponent],
  imports: [
    CommonModule,
    EmpWorkRoutingModule,
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
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    MatSliderModule
  ],
  exports: [CKEditorModule],
  providers: [EmpService]
})
export class EmpWorkModule { }
