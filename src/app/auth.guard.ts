import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route.url.join(''));
      
      if(!localStorage.getItem("token")) {
        if(route.url.join('').indexOf('seller') == 0)
          this.router.navigate(['seller/login']);
        else
          this.router.navigate(['/login']);
        return false;
      }

      return true;
    }
  
}
