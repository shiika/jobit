import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  exports: [
    CommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
