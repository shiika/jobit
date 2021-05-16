import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URLS } from "../API_URLS";
import { catchError, take, tap } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/login/login.component";
import { handleError } from "../../core/utils/handleError.util";
import { saveToken } from "../../core/utils/savetoken.util";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })

export class AuthService {
    userId: number;
    isLoggedIn: boolean = false;
    redirectUrl: string;
    userType: string;
    constructor(private http: HttpClient, private router: Router) {}

    registerForm(formInfo: {[key: string]: string}, action: string) {
        return this.http.post(API_URLS.seeker[action], formInfo, {
            headers: new HttpHeaders({
                "Content-Type": "Application/json"
            }),
            responseType: "text"
        }).pipe(
            take(1)
        )
    }

    registerEmp(formInfo: {[key: string]: string}) {
        return this.http.post(API_URLS.emp.register, formInfo, {
            headers: new HttpHeaders({
                "Content-Type": "Application/json"
            }),
            responseType: "text"
        }).pipe(
            take(1)
        )
    }

    loginUser(userInfo: User, userType: string): Observable<{[key: string]: string}> {
        return this.http.post(API_URLS["emp"].login, userInfo, {
            headers: new HttpHeaders({
                "x-user-type": userType
            })
        }).pipe(
            take(1),
            catchError(handleError),
            tap((credentials: {[key: string]: any}) => {
                saveToken(credentials);
                this.userId = credentials.userId;
                this.isLoggedIn = true;
                this.redirectUrl = userType === "job_seeker" ? "/work/explore" : "/find/emps" 
            })
        )
    }

    logout(): void {
        localStorage.removeItem("token");
        this.userId = null;
        this.isLoggedIn = false;
        this.router.navigate(["/"])
    }

    get getUserId(): number {
        return this.userId;
    }

    
}