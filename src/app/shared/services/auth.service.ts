import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URLS } from "../API_URLS";

@Injectable({ providedIn: 'root' })

export class AuthService {
    constructor(private http: HttpClient) {}

    registerUser(userInfo: {[key: string]: string}) {
        return this.http.post(API_URLS.auth.register, userInfo, {
            headers: new HttpHeaders({
                "Content-Type": "Application/json"
            })
        })
    }

    registerInterests(interests: {[key: string]: string}) {
        return this.http.post(API_URLS.seeker.addInterests, interests, {
            headers: new HttpHeaders({
                "Content-Type": "Application/json"
            })
        })
    }

    registerProf(profInfo: {[key: string]: string}) {
        return this.http.post(API_URLS.seeker.addProf, profInfo, {
            headers: new HttpHeaders({
                "Content-Type": "Application/json"
            })
        })
    }

    
}