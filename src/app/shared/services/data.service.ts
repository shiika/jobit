import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { API_URLS } from "../API_URLS";

@Injectable({ providedIn: "root" })

export class DataService {
    constructor(private http: HttpClient) {}

    checkEmail(email: string) {
        return this.http.post<{email: String}>(`${API_URLS.validators.email}`, {email})
    }

    checkPhone(phone: string) {
        return this.http.post<{phone_num: String}>(`${API_URLS.validators.phone}`, {phone})
    }
}