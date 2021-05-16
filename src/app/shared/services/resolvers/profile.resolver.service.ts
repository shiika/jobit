import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from "rxjs/operators";
import { handleError } from 'src/app/core/utils/handleError.util';
import { Seeker } from '../../../core/models/seeker.interface';
import { SeekerService } from '../seeker.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<Seeker> {

  constructor(private seeker: SeekerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Seeker> | Observable<never> {

    return this.seeker.getSeeker()
      .pipe(
        take(1),
        catchError(handleError))
  }
}
