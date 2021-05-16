import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { salaryValidator } from 'src/app/core/validators/salary.validator';
import { SeekerService } from 'src/app/shared/services/seeker.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperienceComponent implements OnInit {
  
  exp: FormGroup = this.fb.group({
    companyName: ["", [Validators.required]],
    salary: ["", [Validators.required, salaryValidator]],
    title: ["", Validators.required],
    jobType: ["Full Time", Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
  })
  constructor(
    private seeker: SeekerService, 
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
      
  }

  submitLogin(): void {
    this.seeker.addExp(this.exp.value)
      .subscribe(
        (res: string) => {
          console.log(res);
        }
      )
  }

}
