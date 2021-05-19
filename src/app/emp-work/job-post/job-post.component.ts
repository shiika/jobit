import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { salaryValidator } from 'src/app/core/validators/salary.validator';
import { EmpService } from 'src/app/shared/services/emp.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {
  @ViewChild("langName", { static: true }) langName: MatSelect;
  @ViewChild("langLevel", { static: true }) langLevel: MatSelect;
  languages: string[] = ["Arabic", "English", "French", "Italian"];
  public Editor = ClassicEditor;
  seperatorKeyCodes: number[] = [ENTER, COMMA];


  post: FormGroup = this.fb.group({
    title: this.fb.control("", Validators.required),
    experience: this.fb.control(0),
    salary: this.fb.control(4000, [Validators.required, salaryValidator]),
    publishDate: this.fb.control(new Date),
    skills: this.fb.array([
      this.fb.control("Teamwork")
    ], [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    description: this.fb.control("<p>Hello Jobs</p>", Validators.required),
    vacancies: this.fb.control(1),
    expireDate: this.fb.control(new Date(new Date().setDate(new Date().getDate() + 10))),
    type: this.fb.control("Full Time", Validators.required),
    langs: this.fb.array([
      
    ], [Validators.required, Validators.minLength(2)]),
  })

  constructor(private fb: FormBuilder, private empService: EmpService, private router: Router) { }

  ngOnInit(): void {
  }

  get skills(): FormArray {
    return this.post.get("skills") as FormArray;
  }

  get langs(): FormArray {
    return this.post.get("langs") as FormArray;
  }

  addSkill(e: MatChipInputEvent): void {
    const value = e.value.trim();
    const control = new FormControl(value, Validators.minLength(3));
    if (control.valid) {
      this.skills.push(control);
      e.input.value = "";
    }
  }

  formatLabel(value: number) {
    return (value / 1000) + "k";
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

  postForm(form: FormGroup): void {
    this.empService.postJob(form.value)
    .subscribe(
      async _ => {
            const swal = (await import("sweetalert2")).default;
            swal.fire({
              title: "Wait for your employees",
              text: "Your Job Post is Now LIVE",
              icon: "success",
              confirmButtonText: "Find Employers",
              denyButtonText: "Return to homepage",
              showConfirmButton: true,
              showDenyButton: true
              // buttons: ["Return to homepage", "Find jobs"]
            })
            .then(value => {
              if (value.isConfirmed) {
                this.router.navigate(["/find/emps"]);
              } else if (value.isDenied) {
                this.router.navigate(["/home"])
              }
            })
          },
        (error: any) => {
          console.log(error);
        });
  }

}
