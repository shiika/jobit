import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../../login/login.component';
import { AuthService } from "../../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SeekerGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router, private dialog: MatDialog) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url)
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkLogin(route.path)
    }

  private checkLogin(url: string): boolean|UrlTree {
    if (this.auth.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.auth.redirectUrl = url;

    // Redirect to the login page
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "900px"
    });
    // return false
    return this.router.parseUrl('/home');
  }
}
