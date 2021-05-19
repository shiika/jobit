import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API_URLS } from "../API_URLS";
import { Seeker } from "../../core/models/seeker.interface";
import { catchError, concatMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Experience } from "../../core/models/experience.interface";
import { AuthService } from './auth.service';
import { Education } from '../../core/models/education.interface';
import { handleError } from 'src/app/core/utils/handleError.util';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {
  $experiences: BehaviorSubject<Experience[]> = new BehaviorSubject<Experience[]>(null);
  $education: BehaviorSubject<Education[]> = new BehaviorSubject<Education[]>(null);
  customHeaders: HttpHeaders = new HttpHeaders({
    "x-auth-token": localStorage.getItem("token")
  });
  public experiences: Experience[] = [];
  public educations: Education[] = [];

  constructor(private http: HttpClient, private auth: AuthService) { }

  getSeeker(id: string): Observable<Seeker> {
    let headers: HttpHeaders = this.customHeaders;
    if (id != null) {
      headers = this.customHeaders.append("seeker-id", id)
    }
    return this.http.get<Seeker>(API_URLS["seeker"].profile, {
      headers: headers
  }).pipe(take(1))
  }

  getInterests(): Observable<{[key: string]: string}> {
    return this.http.get<{[key: string]: string}>(API_URLS["seeker"].getInterests, {
      headers: new HttpHeaders({
          "x-auth-token": localStorage.getItem("token")
      })
  }).pipe(take(1))
  }

  getSkills(id: string): Observable<string[]> {
    let headers: HttpHeaders = this.customHeaders;
    if (id != null) {
      headers = this.customHeaders.append("seeker-id", id)
    }
    return this.http.get<string[]>(API_URLS["seeker"].skills, {
      headers: headers
  }).pipe(take(1))
  }

  getLangs(id: string): Observable<{name: string; level: string}[]> {
    let headers: HttpHeaders = this.customHeaders;
    if (id != null) {
      headers = this.customHeaders.append("seeker-id", id)
    }
    console.log(headers);
    return this.http.get<{name: string; level: string}[]>(API_URLS["seeker"].langs, {
      headers: headers
      })
      .pipe(take(1))
  }

  getExp(id: string): Observable<Experience[]> {
    let headers: HttpHeaders = this.customHeaders;
    if (id != null) {
      headers = this.customHeaders.append("seeker-id", id)
    }
    return this.http.get<Experience[]>(API_URLS["seeker"].exp, {
      headers: headers
      })
      .pipe(
        take(1),
        concatMap((exps: any[]) => {
          this.experiences = exps.map(exp => {
            return {
              ID: exp.ID,
              companyName: exp.company_name,
              salary: exp.salary,
              title: exp.job_title,
              jobType: exp.job_type,
              startDate: exp.start_date,
              endDate: exp.end_date
            }
          });
          this.$experiences.next(this.experiences);
          return this.$experiences
        }))
  }

  addExp(exp: Experience): Observable<string> {
    return this.http.post(API_URLS["seeker"].addExp, exp, {
      headers: new HttpHeaders({
          "x-auth-token": localStorage.getItem("token")
      }),
      responseType: "text"
      })
      .pipe(
        take(1),
        tap(_ => {
          this.experiences.push(exp);
          this.$experiences.next(this.experiences);
        }),
        catchError(handleError)
        )
  }

  removeExp(id: number): Observable<string> {
    return this.http.delete(API_URLS["seeker"].removeExp, {
      headers: new HttpHeaders({
          "x-auth-token": localStorage.getItem("token")
      }),
      responseType: "text",
      params: new HttpParams().set("id", `${id}`)
      })
      .pipe(
        take(1),
        tap(_ => {
          this.experiences = this.experiences.filter(item => {
            return item.ID !== id;
          });
          this.$experiences.next(this.experiences);
        }))
  }

  getEdu(id: string): Observable<Education[]> {
    let headers: HttpHeaders = this.customHeaders;
    if (id != null) {
      headers = this.customHeaders.append("seeker-id", id)
    }
    return this.http.get<Education[]>(API_URLS["seeker"].edu, {
      headers: headers
      })
      .pipe(
        take(1),
        concatMap((edus: any[]) => {
          this.educations = edus.map(edu => {
            return {
              degreeLevel: edu.degree_level,
              institution: edu.institution,
              fieldOfStudy: edu.field_of_study,
              grade: edu.graduation_level,
              startDate: edu.start_date,
              endDate: edu.end_date
            }
          });
          this.$education.next(this.educations);
          return this.$education
        }))
  }

  addEdu(edu: Education): Observable<string> {
    return this.http.post(API_URLS["seeker"].addEdu, edu, {
      headers: new HttpHeaders({
          "x-auth-token": localStorage.getItem("token")
      }),
      responseType: "text"
      })
      .pipe(
        take(1),
        tap(_ => {
          this.educations.push(edu);
          this.$education.next(this.educations);
        }),
        catchError(handleError)
        )
  }
}
