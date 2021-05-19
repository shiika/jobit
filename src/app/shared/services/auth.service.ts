import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URLS } from "../API_URLS";
import { catchError, take, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { User } from "src/app/login/login.component";
import { handleError } from "../../core/utils/handleError.util";
import { saveToken } from "../../core/utils/savetoken.util";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })

export class AuthService {
    $user: BehaviorSubject<string> = new BehaviorSubject<string>(null);
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

    updateForm(form: {[key: string]: string}, action: string): Observable<string> {
        return this.http.put(API_URLS["seeker"].update[action], form, {
            headers: new HttpHeaders({
                "x-auth-token": localStorage.getItem("token")
            }),
            responseType: "text"
        })
        .pipe(
            take(1),
            catchError(handleError)
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
                const expire = new Date(Date.now() + 60 * 60 * 1000);
                localStorage.setItem("expireDate", expire.toString());
                localStorage.setItem("userType", userType);
                this.userType = userType;
                this.$user.next(userType);
                saveToken(credentials);
                this.userId = credentials.userId;
                this.isLoggedIn = true;
                this.autoLogout();
                this.redirectUrl = userType === "job_seeker" ? "/work/explore" : "/find/emps" 
            })
        )
    }

    autoLogin(): void {
        const token = localStorage.getItem("token");
        this.userType = localStorage.getItem("userType");
        this.$user.next(this.userType)
        if (token) {
            this.isLoggedIn = true;
            this.autoLogout();
        }
    }

    logout(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("expireDate");
        localStorage.removeItem("userType");
        this.userId = null;
        this.isLoggedIn = false;
        this.router.navigate(["/"])
    }

    autoLogout(): void {
        setTimeout(() => {
            this.logout()
        }, new Date(localStorage.getItem("expireDate")).getTime() - Date.now());
    }

    get getUserId(): number {
        return this.userId;
    }

    get logState(): boolean {
        return this.isLoggedIn
    }

    
}