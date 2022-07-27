import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UniqueEmailValidator } from 'src/app/core/validators/email.validator';
import { UniquePhoneValidator } from 'src/app/core/validators/phone.validator';
import { DataService } from '../../shared/services/data.service';
import { numberValidator } from '../../core/validators/number.validator';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emp-register',
  templateUrl: './emp-register.component.html',
  styleUrls: ['./emp-register.component.scss']
})
export class EmpRegisterComponent implements OnInit {
  locations: {location: string, ID: number}[] = [];
  uploadPercent: Observable<number>;
  seekerImg: File;
  $taskSub: Subscription;

  empForm: FormGroup = this.fb.group({
    firstName: this.fb.control("", Validators.required),
    lastName: this.fb.control("", Validators.required),
    title: this.fb.control("", Validators.required),
    department: this.fb.control("", Validators.required),
    phone: this.fb.control(
      "", 
      [Validators.required, numberValidator], 
      new UniquePhoneValidator(this.dataService).validate.bind(this)
      ),
    email: this.fb.control(
      null, 
      [Validators.required, Validators.email], 
      new UniqueEmailValidator(this.dataService).validate.bind(this)
      ),
    password: this.fb.control("", [Validators.required, Validators.minLength(8)]),

    companyForm: this.fb.group({
      name: this.fb.control("", Validators.required),
      website: this.fb.control("", Validators.required),
      locations: this.fb.array([
        
      ], [Validators.required, Validators.minLength(1)]),
      logo: [""]
    })
  });


  constructor(
    private fb: FormBuilder, 
    private dataService: DataService, 
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.dataService.getLocations().subscribe(
      locations => {
        this.locations = locations;
      }
    )
  }

  get companyForm(): FormGroup {
    return this.empForm.get("companyForm") as FormGroup
  }

  get comLocations(): FormArray {
    return this.companyForm.get("locations") as FormArray
  }

  addLocation(e: MatSelectChange): void {
    this.comLocations.clear();
    e.value.forEach((location: string) => {
      this.comLocations.push(this.fb.control(location));
    });
  }

  // Drag and drop profile photo
  onSelect(event: any) {
    this.seekerImg = event.addedFiles[0];
    console.log(event)
    const filePath = `logos/${this.seekerImg.name}-${this.empForm.get("companyForm.name").value}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.seekerImg);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();

    // get notified when the download URL is available
    this.$taskSub = task.snapshotChanges().pipe(
        finalize(() => {fileRef.getDownloadURL().pipe(take(1)).subscribe(link => {this.empForm.get("companyForm.logo").setValue(link); console.log(link)})})
     )
    .subscribe()
  }

  onRemove() {
    this.seekerImg = null;
  }

  empSubmit(): void {
    this.authService.registerEmp(this.empForm.value)
      .subscribe(
        async _ => {
          const swal = (await import("sweetalert2")).default;
          swal.fire({
            title: "Now you can start your journey",
            text: "You have successfully signed up",
            icon: "success",
            confirmButtonText: "Start hiring",
            denyButtonText: "Return to homepage",
            showConfirmButton: true,
            showDenyButton: true
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
      )
  }

}
