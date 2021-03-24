import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URLS } from "../API_URLS";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";

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

    
}