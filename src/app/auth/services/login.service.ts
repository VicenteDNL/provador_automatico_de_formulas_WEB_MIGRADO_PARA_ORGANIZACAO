import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthResponse } from './interfaces';
import { BaseResponse } from 'src/app/common/models/baseResponse.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly api = `${environment.api}auth/`;

  constructor(private http: HttpClient, private auth: AuthService) {}


  login(email: string, password: string) {
    const data = { email, password };
    return this.http.post<AuthResponse>(this.api.concat('login/'), data);
  }

  logout() {
    const authData = this.auth.getLocalStorage();
    try {
      const httpOptions = {
        headers: new HttpHeaders({
          authorization: 'Bearer ' + authData.accessToken,
        }),
      };
      return this.http.post<BaseResponse>(`${this.api}logout/`, {}, httpOptions);
    } catch (e) {
      return false;
    }
  }
}
