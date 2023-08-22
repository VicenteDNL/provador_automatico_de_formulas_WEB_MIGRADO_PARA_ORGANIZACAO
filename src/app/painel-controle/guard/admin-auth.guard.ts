import {  catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
} from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';

import { Route } from '@angular/compiler/src/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/services/auth.service';
import { BaseResponse } from 'src/app/common/models/baseResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdmin implements CanActivate, CanActivateChild, CanLoad {
  private readonly api = `${environment.api}`;
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.validate();
    }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.validate();
  }

  validate(){
    const authData = this.auth.getLocalStorage();
    if (authData) {
      const httpOptions = {
        headers: new HttpHeaders({
          authorization: 'Bearer ' + authData.accessToken,
        }),
      };
      return this.http.get<BaseResponse>(`${this.api}auth/me`, httpOptions).pipe(
        catchError((__,_)=>{
          this.router.navigate(['login']);
          return new Observable<BaseResponse>();
        }),
        map(response => {

          try {
            if (response.success) {
              return true;
            } else {
              this.router.navigate(['login']);
              return false;
            }
          } catch (e) {
            this.router.navigate(['login']);
            return false;
          }
        },
      ));
    }
    this.router.navigate(['login']);
    return false;
  }
}
