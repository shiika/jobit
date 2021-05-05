import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URLS } from "../API_URLS";
import { catchError, take, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "src/app/login/login.component";
import { handleError } from "./utils/handleError.util";
import { saveToken } from "./utils/savetoken.util";


@Injectable({ providedIn: 'root' })

export class AuthService {
    constructor(private http: HttpClient) {}

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

    loginUser(userInfo: User, userType: string): Observable<string> {
        return this.http.post(API_URLS["emp"].login, userInfo, {
            headers: new HttpHeaders({
                "x-user-type": userType
            }),
            responseType: "text"
        }).pipe(
            take(1),
            catchError(handleError),
            tap(saveToken)
        )
    }

    
}