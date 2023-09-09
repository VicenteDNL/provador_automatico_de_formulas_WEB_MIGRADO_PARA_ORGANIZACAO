/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AlunoAuthGuard implements CanActivate, CanActivateChild {
  private readonly api = `${environment.api}`;
  constructor(private router: Router, private http: HttpClient) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if (next.queryParams.usu_hash === undefined) {
      this.router.navigate(['exercicio/usuario-invalido']);
      return false;
    }
    return this.validate(next.queryParams.usu_hash);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (next.queryParams.usu_hash === undefined) {
      this.router.navigate(['exercicio/usuario-invalido']);
      return false;
    }
    return this.validate(next.queryParams.usu_hash);
  }

  validate(usuHash: string) {
    return this.http
      .post<BaseResponse>(`${this.api}aluno/hash`, {
        hash: usuHash,
      })
      .pipe(
        catchError((__, _) => {
          this.router.navigate(['exercicio/usuario-invalido']);
          return new Observable<BaseResponse>();
        }),
        map(response => {
          try {
            if (response.success) {
              return true;
            } else {
              this.router.navigate(['exercicio/usuario-invalido']);
              return false;
            }
          } catch (e) {
            this.router.navigate(['exercicio/usuario-invalido']);
            return false;
          }
        }),
      );
  }
}
