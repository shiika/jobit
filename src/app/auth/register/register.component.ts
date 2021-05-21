import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { AuthService } from "../../shared/services/auth.service";
import { UniqueEmailValidator } from "../../core/validators/email.validator";
import { UniquePhoneValidator } from "../../core/validators/phone.validator";
import { numberValidator } from "../../core/validators/number.validator";
import { salaryValidator } from "../../core/validators/salary.validator";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { SeekerService } from 'src/app/shared/services/seeker.service';
import { Seeker } from 'src/app/core/models/seeker.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../assets/scss/media/_register.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild("chipList", { static: true }) chipList: MatChipList;
  @ViewChild("typesList", { static: true }) typesList: MatChipList;
  @ViewChild("skillsList", { static: true }) skillsList: MatChipList;
  @ViewChild("stepper", { static: true }) stepper: MatStepper;
  @ViewChild("eduList", { static: true }) eduList: MatChipList;
  @ViewChild("student", { static: true }) student: ElementRef;
  @ViewChild("bachelor", { static: true }) bachelor: ElementRef;
  @ViewChild("langName", { static: true }) langName: MatSelect;
  @ViewChild("langLevel", { static: true }) langLevel: MatSelect;
  isEditMode: boolean;
  isUploaded: boolean = false;
  seekerImg: File;
  filePath: string = "images/profile";
  uploadPercent: Observable<number>;
  $taskSub: Subscription;
  jobTypes: string[] = ["Full Time", "Part Time", "Internship", "Work From Home", "Freelance"];
  languages: string[] = ["Arabic", "English", "French", "Italian"];
  steps: string[] = ["General Info", "Career Interests", "Professional Info"];
  expYears: string[] = Array.from({length: 10}, (value, index) => `${index + 1} Years`);
  seperatorKeyCodes: number[] = [ENTER, COMMA];
  generalInfo: FormGroup = this.fb.group({
    first_name: ["", [Validators.required, Validators.minLength(3)]],
    last_name: ["", [Validators.required, Validators.minLength(3)]],
    birth_date: [null, [Validators.required]],
    gender: ["", [Validators.required]],
    location: ["", [Validators.required]],
    marital_status: ["", [Validators.required]],
    military_status: ["", [Validators.required]],
    image_url: [""],
    phone: ["", 
            [numberValidator, 
              Validators.minLength(11)], 
              new UniquePhoneValidator(this.dataService).validate.bind(this)
            ],
    email: [
      "", 
      [Validators.required, Validators.email], 
       new UniqueEmailValidator(this.dataService).validate.bind(this)
    ],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  careerInterests: FormGroup = this.fb.group({
    min_salary: ["", salaryValidator.bind(this)],
    
    status: ["", Validators.required],
    careerLevel: ["", Validators.required],

    jobTypes: this.fb.array([
      this.fb.control("Full Time")
    ], [Validators.minLength(1), Validators.required]),

    expYears: [0, [Validators.min(0), Validators.max(15), Validators.required]],
    educationLevel: ["", Validators.required],
  });

  profInfo: FormGroup = this.fb.group({
    jobTitles: this.fb.array([
      this.fb.control("frontend"),
    ], { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)] }),
    langs: this.fb.array([
      
    ], [Validators.minLength(2), Validators.required]),
    skills: this.fb.array([
      this.fb.control("Teamwork")
    ], [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    qualification: this.fb.group({
      degreeLevel: ["", Validators.required],
      institution: ["", Validators.required],
      fieldOfStudy: ["", Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      gradGrade: ["", Validators.required],
    }, Validators.required)
  })
  isConfidential: boolean = false;
  isLocationValid: boolean = true;
  downloadUrl: string;
  $seeker: Subscription;
  $interests: Subscription;

  constructor(
    private fb: FormBuilder, 
    private dataService: DataService, 
    private authService: AuthService,
    private seekerService: SeekerService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.student.nativeElement.click();
    this.bachelor.nativeElement.click();
    this.isEditMode = !!this.route.snapshot.params["id"];
    if (this.isEditMode) {
      this.$seeker = this.seekerService.getSeeker(null)
        .subscribe(
          (seeker: Seeker) => {
            this.generalInfo = this.fb.group({
              first_name: [seeker.first_name, [Validators.required, Validators.minLength(3)]],
              last_name: [seeker.last_name, [Validators.required, Validators.minLength(3)]],
              birth_date: [{value: null, disabled: true}, [Validators.required]],
              gender: [{value: null, disabled: true}, [Validators.required]],
              location: [seeker.location, [Validators.required]],
              marital_status: [seeker.marital_status, [Validators.required]],
              military_status: [seeker.military_status, [Validators.required]],
              image_url: [seeker.image_url],
              phone: [seeker.phone_num, 
                      [numberValidator, 
                        Validators.minLength(11)], 
                        new UniquePhoneValidator(this.dataService).validate.bind(this)
                      ],
              email: [
                {value: null, disabled: true}],
              password: [{value: null, disabled: true},],
            });
          }
        );

      this.$interests = this.seekerService.getInterests()
          .subscribe(
            (interests: any) => {
              this.careerInterests = this.fb.group({
                min_salary: [interests.interests.min_salary, salaryValidator.bind(this)],
    
                status: [interests.interests.status, Validators.required],
                careerLevel: [interests.interests.career_level],
            
                jobTypes: this.fb.array(
                  [...interests.types.map((item: string) => this.fb.control(item))]
                  ),
            
                expYears: [interests.interests.expYears, [Validators.min(0), Validators.max(15), Validators.required]],
                educationLevel: [interests.interests.educationLevel, Validators.required],
              });
              // this.selectLevel(interests.interests.career_level);
            }
          )
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
  }

  isDisabled(lang: string): boolean {
    return this.languages.some(item => item === lang);
  }

  // Drag and drop profile photo
  onSelect(event: any) {
    this.isUploaded = false;
    this.seekerImg = event.addedFiles[0];
    const filePath = `images/${this.seekerImg.name}-${this.generalInfo.get("phone").value}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.seekerImg);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();

    // get notified when the download URL is available
    this.$taskSub = task.snapshotChanges().pipe(
        finalize(() => {fileRef.getDownloadURL().pipe(take(1))
          .subscribe(
            link => {
              this.generalInfo.get("image_url").setValue(link); 
              this.isUploaded = true;
            })})
     )
    .subscribe()
  }

  onRemove() {
    this.seekerImg = null;
    this.isUploaded = false;
  }

  updateForm(form: {[key: string]: string}, action: string): void {
    this.authService.updateForm(form, action)
      .subscribe(
        async (res: string) => {
          if (action === "interests") {
            const swal = (await import("sweetalert2")).default;
            return swal.fire({
              title: "Profile updated successfully",
              icon: "success",
              confirmButtonText: "Find jobs",
              denyButtonText: "Return to homepage",
              showConfirmButton: true,
              showDenyButton: true
            })
            .then(value => {
              if (value.isConfirmed) {
                this.router.navigate(["/work/explore"])
              } else if (value.isDenied) {
                this.router.navigate(["/home"])
              }
            })
          }
          this.stepper.next();
        }
      )
  }

  async submitForm(form: {[key: string]: string}, action: string): Promise<void> {
    this.authService.registerForm(form, action)
    .subscribe(
      async (res: string) => {
        if (action === "addProf") {
            const swal = (await import("sweetalert2")).default;
            swal.fire({
              title: "Now you can start your journey",
              text: "You have successfully signed up",
              icon: "success",
              confirmButtonText: "Find jobs",
              denyButtonText: "Return to homepage",
              showConfirmButton: true,
              showDenyButton: true
              // buttons: ["Return to homepage", "Find jobs"]
            })
            .then(value => {
              if (value.isConfirmed) {
                this.dialog.open(LoginComponent, {
                  width: "900px"
                })
              } else if (value.isDenied) {
                this.router.navigate(["/home"])
              }
            })
          }
          this.stepper.next();
        },
        (error: any) => {
          console.log(error);
        });
  }

  ngOnDestroy(): void {
    // this.$taskSub.unsubscribe();
  }

}
