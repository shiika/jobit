import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { API_URLS } from '../API_URLS';
import { JobPost } from '../models/job.model';
import { handleError } from './utils/handleError.util';

@Injectable()
export class EmpService {

  constructor(private http: HttpClient) { }

  postJob(job: JobPost): Observable<string> {
    return this.http.post(API_URLS["emp"].postJob, job, {
        headers: new HttpHeaders({
            "x-access-token": localStorage.getItem("token")
        }),
        responseType: "text"
    }).pipe(
        take(1),
        catchError(handleError)
    )
}
}
