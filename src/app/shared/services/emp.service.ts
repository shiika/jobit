import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { take, catchError, tap, map } from 'rxjs/operators';
import { API_URLS } from '../API_URLS';
import { Job, JobDesc, JobPost } from '../../core/models/job.model';
import { handleError } from '../../core/utils/handleError.util';
import { Seeker } from 'src/app/core/models/seeker.interface';
import { Employee } from 'src/app/core/models/employee.model';
import { DataService } from './data.service';

@Injectable()
export class EmpService {
    $employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
    $empJobs: BehaviorSubject<JobDesc[]> = new BehaviorSubject<JobDesc[]>([]);
    empJobs: JobDesc[] = [];

  constructor(private http: HttpClient) { }

  postJob(job: JobPost): Observable<string> {
    return this.http.post(API_URLS["job"].postJob, job, {
        headers: new HttpHeaders({
            "x-auth-token": localStorage.getItem("token")
        }),
        responseType: "text"
    }).pipe(
        take(1),
        catchError(handleError)
    )
  }

  removeJob(id: number): Observable<string> {
    return this.http.delete(API_URLS.emp.removeJob, {
        headers: new HttpHeaders({
            "x-auth-token": localStorage.getItem("token"),
            "job-id": id.toString()
        }),
        responseType: "text"
    }).pipe(
        take(1),
        catchError(handleError),
        tap(_ => {
            const newJobs = this.empJobs.filter(job => {
                return job.ID != id
            });
            this.empJobs = newJobs;
            this.$empJobs.next(this.empJobs);
            
        })
    )
}

  getJobs(): Observable<JobDesc[]> {
    return this.http.get<JobDesc[]>(API_URLS["job"].empJobs, {
      headers: new HttpHeaders({
        "x-auth-token": localStorage.getItem("token")
      })
    })
    .pipe(
      take(1),
      catchError(handleError),
      tap(jobs => {
        this.empJobs = jobs;
        this.$empJobs.next(jobs);
      })
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
