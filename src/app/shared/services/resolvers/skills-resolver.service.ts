import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { SeekerService } from "../seeker.service"; 
import { handleError } from "../../../core/utils/handleError.util";

@Injectable({
  providedIn: 'root'
})
export class SkillsResolverService implements Resolve<string[]> {

  constructor(private seeker: SeekerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> | Observable<never> {

    return this.seeker.getSkills()
      .pipe(
        take(1),
        catchError(handleError))
  }
}
