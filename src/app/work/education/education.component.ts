import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { salaryValidator } from '../../core/validators/salary.validator';
import { LoginComponent } from '../../login/login.component';
import { SeekerService } from '../../shared/services/seeker.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EducationComponent implements OnInit {
  
  edu: FormGroup = this.fb.group({
    degreeLevel: ["", [Validators.required]],
    institution: ["", [Validators.required]],
    fieldOfStudy: ["", Validators.required],
    grade: ["", Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
  })
  constructor(
    private seeker: SeekerService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
      
  }

  submitLogin(): void {
    this.seeker.addEdu(this.edu.value)
      .subscribe(
        async (res: string) => {
          const swal = (await import("sweetalert2")).default;
          swal.fire({
            title: "Education has been added",
            icon: "success",
            confirmButtonText: "Done",
            showConfirmButton: true
          })
          .then(value => {
            if (value.isConfirmed) {
              this.dialogRef.close("bananas");
            }
          })
        }
      )
  }

}
