import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

export class User {
  constructor(
    public email: string,
    public password: string
  ) {}
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm", {static: true}) loginForm: NgForm;
  error: string = "";
  userType: 'seeker' | 'employer' = "seeker";
  constructor(
    private authService: AuthService, 
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>) { }

  model = new User("", "");

  ngOnInit(): void {
    this.loginForm.valueChanges
      .subscribe(
        value => {
          this.error = "";
        }
      )
  }

  submitLogin(): void {
    this.authService.loginUser(this.model, this.userType === "seeker" ? "job_seeker" : "employer")
      .subscribe(
        _ => {
          this.authService.userType = this.userType;
          this.dialogRef.close("pizza");
          this.router.navigate([this.authService.redirectUrl])
        },
        (error: string) => {
          this.error = error;
        }
      )
    // console.log(this.loginForm)
  }

}
