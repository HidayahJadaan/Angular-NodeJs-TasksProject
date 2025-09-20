import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivateChild {
  constructor(private router:Router){}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (localStorage.getItem('token')) {
      // user is logged in, allow
      return true;
    } else {
      // not logged in, redirect to login
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
