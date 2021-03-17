import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { AuthService } from "../shared/services/auth.service";
import { UniqueEmailValidator } from "../shared/validators/email.validator";
import { UniquePhoneValidator } from "../shared/validators/phone.validator";
import { numberValidator } from "../shared/validators/number.validator";
import { salaryValidator } from "../shared/validators/salary.validator";
import { ENTER, COMMA, T } from "@angular/cdk/keycodes";
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../assets/scss/media/_register.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild("chipList", { static: true }) chipList: MatChipList;
  @ViewChild("typesList", { static: true }) typesList: MatChipList;
  @ViewChild("skillsList", { static: true }) skillsList: MatChipList;
  @ViewChild("stepper", { static: true }) stepper: MatStepper;
  @ViewChild("eduList", { static: true }) eduList: MatChipList;
  @ViewChild("student", { static: true }) student: ElementRef;
  @ViewChild("bachelor", { static: true }) bachelor: ElementRef;
  @ViewChild("langName", { static: true }) langName: MatSelect;
  @ViewChild("langLevel", { static: true }) langLevel: MatSelect;
  jobTypes: string[] = ["Full Time", "Part Time", "Internship", "Work From Home", "Freelance"];
  languages: string[] = ["Arabic", "English", "French", "Italian"];
  steps: string[] = ["General Info", "Career Interests", "Professional Info"];
  expYears: string[] = Array.from({length: 10}, (value, index) => `${index + 1} Years`);
  seperatorKeyCodes: number[] = [ENTER, COMMA];
  generalInfo: FormGroup = this.fb.group({
    first_name: ["islam", [Validators.required, Validators.minLength(3)]],
    last_name: ["abdelkarim", [Validators.required, Validators.minLength(3)]],
    birth_date: [new Date(1997, 6, 30), [Validators.required]],
    gender: ["male", [Validators.required]],
    location: ["Cairo", [Validators.required]],
    marital_status: ["single", [Validators.required]],
    military_status: ["exempted", [Validators.required]],
    phone: ["011111111", 
            [numberValidator, 
              Validators.minLength(11)], 
              new UniquePhoneValidator(this.dataService).validate.bind(this)
            ],
    email: [
      "loka.eslam@hotmail.com", 
      [Validators.required, Validators.email], 
       new UniqueEmailValidator(this.dataService).validate.bind(this)
    ],
    password: ["22222222", [Validators.required, Validators.minLength(8)]],
  });

  careerInterests: FormGroup = this.fb.group({
    min_salary: ["4000", salaryValidator.bind(this)],
    
    status: ["ready to work", Validators.required],
    careerLevel: ["Student", Validators.required],

    jobTypes: this.fb.array([
      this.fb.control("Full Time")
    ], [Validators.minLength(1), Validators.required]),

    expYears: [0, [Validators.min(0), Validators.max(15), Validators.required]],
    educationLevel: ["Bachelor's Degree", Validators.required],
  });

  profInfo: FormGroup = this.fb.group({
    jobTitles: this.fb.array([
      this.fb.control("frontend"),
      this.fb.control("backend")
    ], { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)] }),
    langs: this.fb.array([
      
    ], [Validators.minLength(2), Validators.required]),
    skills: this.fb.array([
      this.fb.control("Teamwork"),
      this.fb.control("HTML")
    ], [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    qualification: this.fb.group({
      degreeLevel: ["Bachelor's", Validators.required],
      institution: ["University of Helwan", Validators.required],
      fieldOfStudy: ["Engineering", Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      gradGrade: ["D", Validators.required],
    }, Validators.required)
  })
  isConfidential: boolean = false;
  isLocationValid: boolean = true;

  constructor(private fb: FormBuilder, private dataService: DataService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.student.nativeElement.click();
    this.bachelor.nativeElement.click();
    console.log(this.generalInfo)
  }

  setConfidential(event: MatCheckboxChange): void {
    this.isConfidential = !this.isConfidential;
    if (event.checked) {
      this.careerInterests.get("min_salary").disable();
      this.careerInterests.get("min_salary").setValue("Confidential");
    } else {
      this.careerInterests.get("min_salary").enable();
      this.careerInterests.get("min_salary").setValue("");
    }
  }

  addTitle(e: MatChipInputEvent): void {
    const value: string = e.value.trim().toLowerCase();
    const control: FormControl = new FormControl(value, Validators.minLength(3));
    if (control.valid && !this.jobTitles.controls.find(control => control.value === value)) {
      this.jobTitles.push(control);
      e.input.value = "";
    } else {
      e.input.value = ""
    }
    console.log(this.careerInterests);
  }

  addSkill(e: MatChipInputEvent): void {
    const value = e.value.trim();
    const control = new FormControl(value, Validators.minLength(3));
    if (control.valid) {
      this.skills.push(control);
      e.input.value = "";
    }
    console.log(this.careerInterests);
  }

  get jobTitles(): FormArray {
    return this.profInfo.get("jobTitles") as FormArray
  }

  get langs(): FormArray {
    return this.profInfo.get("langs") as FormArray
  }

  get skills(): FormArray {
    return this.profInfo.get("skills") as FormArray
  }

  get qualification(): FormGroup {
    return this.profInfo.get("qualification") as FormGroup
  }

  selectLevel(e: any) {
    const value = e.target["innerText"];
    this.chipList.value = value;
    this.careerInterests.get("careerLevel").setValue(this.chipList.value);
  }

  selectDegree(e: any) {
    const value = e.target["innerText"];
    this.eduList.value = value;
    this.careerInterests.get("educationLevel").setValue(this.eduList.value);
  }

  selectType(e: any, i: number) {
    const value: string = e.target["innerText"];
    if (!this.typesList.value?.includes(value) ) {
      (this.careerInterests.get("jobTypes") as FormArray).push(new FormControl(value));
      this.typesList.value = this.careerInterests.get("jobTypes").value;
    } else {
      this.typesList.value = this.typesList.value.filter((item: string) => item != value);
      (this.careerInterests.get("jobTypes") as FormArray).clear();
      for (let type of this.typesList.value) {
        (this.careerInterests.get("jobTypes") as FormArray).push(new FormControl(type))
      }
    }
  }

  selectSkill(e: any, i: number) {
    const value: string = e.target["innerText"];
    if (!this.skillsList.value?.includes(value) ) {
      (this.profInfo.get("skills") as FormArray).push(new FormControl(value));
      this.skillsList.value = this.profInfo.get("skills").value;
    } else {
      this.skillsList.value = this.skillsList.value.filter((item: string) => item != value);
      (this.profInfo.get("skills") as FormArray).clear();
      for (let type of this.skillsList.value) {
        (this.profInfo.get("skills") as FormArray).push(new FormControl(type))
      }
    }
  }

  addLang(name: string, level: string): void {
    this.langName.options.changes.subscribe(v => console.log(v));
    this.langs.push(this.fb.group({
      name: this.fb.control(name, Validators.required),
      proficiency: this.fb.control(level, Validators.required)
    }, Validators.required));
    this.langName.writeValue(null);
    this.langLevel.writeValue(null);
    this.languages = this.languages.filter(item => item !== name);
  }

  removeLang(index: number, value: string): void {
    this.langs.removeAt(index);
    this.languages.push(value);
    console.log(this.languages)
  }

  isDisabled(lang: string): boolean {
    return this.languages.some(item => item === lang);
  }

  generalSubmit(): void {
    this.authService.registerUser(this.generalInfo.value)
      .subscribe(
        (res: any) => {
          this.stepper.next();
          console.log(res);
        },
        (error:any) => {
          console.log(error)
        });
    // this.stepper.next();
        
  }

  interestsSubmit(): void {
    this.authService.registerInterests(this.careerInterests.value)
      .subscribe((res: any) => {
        this.stepper.next();
        console.log(res);
      },
      (error: any) => {
        console.log(error)
      })
    // this.stepper.next();
  }

  profSubmit(): void {
    this.authService.registerProf(this.profInfo.value)
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      )
    // console.log(this.profInfo)
  }

}
