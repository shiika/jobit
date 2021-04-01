import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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
  constructor(private authService: AuthService) { }

  model = new User("", "");

  ngOnInit(): void {
    console.log(this.loginForm);
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
        (token: string) => {
          console.log(token);
        },
        (error: string) => {
          this.error = error;
        }
      )
    // console.log(this.loginForm)
  }

}
