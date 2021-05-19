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
    constructor(private http: HttpClient) {}

    checkEmail(email: string) {
        return this.http.post<{email: String}>(`${API_URLS.validators.email}`, {email})
    }

    checkPhone(phone: string) {
        return this.http.post<{phone_num: String}>(`${API_URLS.validators.phone}`, {phone})
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
                return {...job, publishDate: job.publish_date}
            })),
            tap((jobs: JobDesc[]) => {
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
        return this.jobs.find((job: JobDesc) => job.ID === id)
    }
}