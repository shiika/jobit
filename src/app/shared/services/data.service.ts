import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { API_URLS } from "../API_URLS";
import { BehaviorSubject, Observable } from "rxjs";
import { Job, JobApp, JobDesc, JobPost } from "src/app/core/models/job.model";
import { catchError, concatMap, map, take, tap } from "rxjs/operators";
import { handleError } from "src/app/core/utils/handleError.util";
import { EmpService } from "./emp.service";

@Injectable({ providedIn: "root" })

export class DataService {
    $jobs: BehaviorSubject<JobDesc[]> = new BehaviorSubject<JobDesc[]>([]);
    $apps: BehaviorSubject<JobApp[]> = new BehaviorSubject<JobApp[]>([]);
    $saved: BehaviorSubject<JobDesc[]> = new BehaviorSubject<JobDesc[]>([]);
    jobs: JobDesc[] = [];
    apps: JobApp[] = [];
    private _jobId: string;
    constructor(private http: HttpClient, private emp: EmpService) {}

    checkEmail(email: string) {
        return this.http.post<{email: String}>(`${API_URLS.validators.email}`, {email})
    }

    checkPhone(phone: string) {
        return this.http.post<{phone_num: String}>(`${API_URLS.validators.phone}`, {phone})
    }

    applyJob(jobId: string): Observable<string> {
        return this.http.get(API_URLS.job.apply, {
            headers: new HttpHeaders({
                "x-auth-token": localStorage.getItem("token"),
                "job-id": jobId
            }),
            responseType: "text"
        })
        .pipe(
            take(1),
            catchError(handleError),
            tap(_ => {
                this.jobs = this.jobs.filter(job => job.ID !== +jobId);
                this.getApps().subscribe(apps => {
                    this.apps = apps;
                    this.$apps.next(this.apps)
                })
                this.$jobs.next(this.jobs);
            })
            )
    }

    getJobs(title: string): Observable<JobDesc[]> {
        return this.http.get<JobDesc[]>(API_URLS.job.getJobs, {
            headers: new HttpHeaders({
                "x-auth-token": localStorage.getItem("token"),
                "title-search": title
            })
        })
        .pipe(
            take(1),
            catchError(handleError),
            map((jobs: any[]) => jobs.map(job => {
                const {ID, location, skills, companyName, description, experience_needed, logo, publish_date: publishDate, salary, title, type_name: type, vacancies} = job;
                return {ID, location, skills, companyName, description, experience_needed, logo, publishDate, salary, title, type, vacancies}
            })),
            tap((jobs: JobDesc[]) => {
                this.$jobs.next(jobs);
                this.jobs = jobs;
            })
        )
    }

    getApps(): Observable<JobApp[]> {
        return this.http.get<JobApp[]>(API_URLS.seeker.getApps, {
            headers: new HttpHeaders({
                "x-auth-token": localStorage.getItem("token")
            })
        })
        .pipe(
            take(1),
            catchError(handleError),
            map((apps: JobApp[]) => {
                return apps.map((item: any) => {
                    return {
                        app: {
                            ID: item.app.ID,
                            title: item.app.title,
                            publishDate: item.app.publish_date,
                            stateDate: item.app.state_date,
                            status: item.app.application_status
                        },
                        companyName: item.companyName,
                        logo: item.logo
                    }
                })
            }),
            tap((apps: JobApp[]) => {
                const newJobs = this.jobs.filter(job => {
                    return apps.findIndex(app => { return app.app.ID == job.ID }) == -1
                });
                this.$jobs.next(newJobs);
                this.jobs = newJobs;
                this.$apps.next(apps);
                this.apps = apps;
            })
        )
    }

    removeApp(id: number): Observable<Object> {
        return this.http.delete(API_URLS["seeker"].removeApp, {
          headers: new HttpHeaders({
              "x-auth-token": localStorage.getItem("token"),
              "job-id": id.toString()
          }),
          responseType: "json"
          })
          .pipe(
            take(1),
            tap(_ => {
              const newApps = this.apps.filter(app => {
                  return app.app.ID != id
              });
              this.apps = newApps;
              this.$apps.next(this.apps);
              console.log(newApps)
            }))
      }

    getSkills(id: string): Observable<string[]> {
        return this.http.get<Job[]>(API_URLS.job.getSkills, {
            headers: new HttpHeaders({
                "x-auth-token": localStorage.getItem("token"),
                "job-id": id
            })
        })
        .pipe(
            take(1),
            catchError(handleError)
        )
    }

    getJob(id: number): JobDesc {
        this._jobId = id.toString();
        return this.jobs.find((job: JobDesc) => job.ID === id)
    }

    getSaved(): Observable<JobDesc[]> {
        return this.http.get<JobDesc[]>(API_URLS["job"].saved, {
            headers: new HttpHeaders({
                "x-auth-token": localStorage.getItem("token")
            })
        }).pipe(
            take(1),
            catchError(handleError),
            tap(jobs => {
                this.$saved.next(jobs);
            })
        )
    }

    get jobId(): string {
        return this._jobId
    }
}