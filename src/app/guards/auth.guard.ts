import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../providers/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let url: string = state.url;

      return this.checkLogin(url);
  }


  checkLogin(url: string): boolean {

    let loggedIn;
    let logged;
    this.authService.authStateSubject.subscribe(data => {

      loggedIn = data;

      console.log("auth guard bool : ", loggedIn);
      console.log("auth guard localStorage : ", localStorage.getItem('currentUser'));

      if(loggedIn.currentUser !== null && localStorage.getItem('currentUser')) {
        logged = true;
      }
      else {
        this.router.navigateByUrl('/login');
        logged = false;
      }

    })

    return logged;



  }
}
