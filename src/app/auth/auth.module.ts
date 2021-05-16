import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { EmpRegisterComponent } from './emp-register/emp-register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatProgressBarModule } from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    RegisterComponent,
    EmpRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxDropzoneModule,
    MatProgressBarModule
  ]
})
export class AuthModule { }
