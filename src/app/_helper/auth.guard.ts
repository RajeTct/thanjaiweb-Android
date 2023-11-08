import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) { }

  //without role based auth guard
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  //   if (this.authservice.isLoggedIn !== true) {
  //     window.alert("Access not allowed please login!");
  //     this.router.navigate(['/signin'])
  //   }
  //   return true;
  // }

  //With role base authgurad
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const Checkuserrole = this.authservice.userValue;
    // let userrole = this.authservice.userValue
    if (this.authservice.isLoggedIn === true) {
      if (Checkuserrole) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(Checkuserrole) === -1) {
          // role not authorised so redirect to home page
          this.router.navigate(['/signin'])
          return false;
        }

        // authorised so return true
        return true;
      }
      // checke role  so redirect to login page with the return url
      this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }




}
