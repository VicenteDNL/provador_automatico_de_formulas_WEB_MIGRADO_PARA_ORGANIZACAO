import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AlunoAuthService } from '../service/aluno-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlunoAuthGuard implements CanActivate, CanActivateChild {
  private readonly api = `${environment.api}`;
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AlunoAuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if (next.queryParams.usu_hash === undefined) {
      this.router.navigate(['exercicio/error/token']);
      return false;
    }

    return this.http
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .post<{success: boolean; mgs: string}>(`${this.api}aluno/hash`, { usu_hash: next.queryParams.usu_hash })
      .pipe(
        map(response => {
          try {
            if (response.success) {
              this.auth.set(next.queryParams.usu_hash);
              return true;
            } else {
              this.router.navigate(['exercicio/error/token']);
              return true;
            }
          } catch (e) {
            this.router.navigate(['exercicio/error/token']);
            return true;
          }
        }),
      );
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
}
