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
    $savedSeekers: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
    emps: Employee[] = [];
    empJobs: JobDesc[] = [];
    savedSeekers: Employee[] = [];

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

  saveSeeker(id: number): Observable<string> {
    return this.http.get(API_URLS["emp"].saveSeeker, {
        headers: new HttpHeaders({
            "x-auth-token": localStorage.getItem("token"),
            "seeker-id": id.toString()
        }),
        responseType: "text"
    }).pipe(
        take(1),
        catchError(handleError)
    )
  }

  getSavedSeekers(): Observable<Employee[]> {
    return this.http.get(API_URLS["emp"].getSeekers, {
      headers: new HttpHeaders({
          "x-auth-token": localStorage.getItem("token"),
      }),
    }).pipe(
        take(1),
        catchError(handleError),
        tap((emps: Employee[]) => {
          this.savedSeekers = emps.map((emp: any) => {
            return {
              ID: emp.ID,
              firstName: emp.first_name,
              lastName: emp.last_name,
              salary: emp.min_salary,
              img: emp.image_url,
              title: emp.role_name, 
              isSaved: this.emps.some(value => value.ID == emp.ID)
            }
          });
          this.$savedSeekers.next(this.savedSeekers);
          this.emps = this.emps.map(emp => {
            return {
              ...emp,
              isSaved: this.savedSeekers.some(value => value.ID == emp.ID)}
          })
          this.$employees.next(this.emps);
          // this.emps = newEmps;
        })
    )
  }

  deleteSeeker(id: number): Observable<string> {
    return this.http.delete(API_URLS["emp"].removeSeeker, {
      headers: new HttpHeaders({
          "x-auth-token": localStorage.getItem("token"),
          "seeker-id": id.toString()
      }),
      responseType: "text"
    }).pipe(
        take(1),
        catchError(handleError),
        tap(_ => {
          const newSaved = this.savedSeekers.filter(emp => {
            return emp.ID != id
        });
        this.savedSeekers = newSaved;
        this.$savedSeekers.next(this.savedSeekers);
        this.emps = this.emps.map(emp => {
          return {
            ...emp,
            isSaved: this.savedSeekers.some(value => value.ID == emp.ID)}
        })
        this.$employees.next(this.emps);
        })
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
      tap((emps: Employee[]) => {
        this.emps = emps.map((emp: any) => {
          return {
            ID: emp.ID,
            firstName: emp.first_name,
            lastName: emp.last_name,
            salary: emp.min_salary,
            img: emp.image_url,
            title: emp.role_name
          }
        });
        this.$employees.next(this.emps);
      }))
  }
}
