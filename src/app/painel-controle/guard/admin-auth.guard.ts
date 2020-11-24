
import { delay, map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Route } from '@angular/compiler/src/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginService } from 'src/app/auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate, CanActivateChild, CanLoad {
  private readonly API =  `${environment.API}`;
  constructor(
              private auth$: AuthService, 
              private router: Router,
              private http:HttpClient,
              private login$: LoginService,) { }
  
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let authData = this.auth$.get();
      
      if (authData) {
        return this.http.get(`${this.API}islogin/funcionario/?token=${authData['token']}`).pipe(map((response) => {
          if (response['grupo']=='Administrador') {
              return true;
          } else {
              this.router.navigate(['admin']);
              return false;
          }
           }));
        }
        this.router.navigate(['admin']);
        return false;
        
    
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  canLoad( route:Route): Observable<boolean>| Promise<boolean> | boolean {
      let authData = this.auth$.get();
      if (authData) {
        const httpOptions = {headers: new HttpHeaders({'Authorization': "Bearer " + authData['access_token']})};
        return this.http.get(`${this.API}auth/me`,httpOptions).pipe(map((response) => {
          try {
            if (response['success']) {
                return true;
            }else {
                this.router.navigate(['login']);
                return false;
            }
          }
          catch (e) {
            return false;
          }
        }));

      }
      this.router.navigate(['login']);
      return true;  
  }


  getToken(){
    let authData = this.auth$.get();
    const httpOptions = {headers: new HttpHeaders({'Authorization': "Bearer " + authData['access_token']})};
    class Retorno {constructor(public resultado?: Object,public paciente?: Object,) {}}
    return this.http.get(`${this.API}auth/me`,httpOptions).pipe( 
      map(res=> {
        if (!res['success']) {
          throw new Error('Value expected!');
        }
        return true;
      }),
      catchError(err => 'erro!!!')
    );
  }

}
