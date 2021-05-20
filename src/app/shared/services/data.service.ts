import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { API_URLS } from "../API_URLS";
import { BehaviorSubject, Observable } from "rxjs";
import { Job, JobDesc, JobPost } from "src/app/core/models/job.model";
import { catchError, map, take, tap } from "rxjs/operators";
import { handleError } from "src/app/core/utils/handleError.util";

@Injectable({ providedIn: "root" })

export class DataService {
    $jobs: BehaviorSubject<JobDesc[]> = new BehaviorSubject<JobDesc[]>([]);
    jobs: JobDesc[] = [];
    private _jobId: string;
    constructor(private http: HttpClient) {}

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
                console.log(jobs);
                this.$jobs.next(jobs);
                this.jobs = jobs;
            })
        )
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

    get jobId(): string {
        return this._jobId
    }
}