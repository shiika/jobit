import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { take, catchError, tap, map } from 'rxjs/operators';
import { API_URLS } from '../API_URLS';
import { JobPost } from '../../core/models/job.model';
import { handleError } from '../../core/utils/handleError.util';
import { Seeker } from 'src/app/core/models/seeker.interface';
import { Employee } from 'src/app/core/models/employee.model';

@Injectable()
export class EmpService {
    $employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

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

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URLS.emp.employees, {
      headers: new HttpHeaders({
        "x-auth-token": localStorage.getItem("token")
      })
    })
    .pipe(
      take(1),
      catchError(handleError),
      map((emps: Employee[]) => {
        return emps.map((emp: any) => {
          return {
            ID: emp.ID,
            firstName: emp.first_name,
            lastName: emp.last_name,
            salary: emp.min_salary,
            img: emp.image_url,
            title: emp.role_name
          }
        })
      }))
  }
}
