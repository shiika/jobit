import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { SeekerService } from "../seeker.service"; 
import { handleError } from "../../../core/utils/handleError.util";

@Injectable({
  providedIn: 'root'
})
export class LangsResolverService implements Resolve<{name: string; level: string}[]> {

  constructor(private seeker: SeekerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{name: string; level: string}[]> | Observable<never> {

    return this.seeker.getLangs()
      .pipe(
        take(1),
        catchError(handleError))
  }
}
