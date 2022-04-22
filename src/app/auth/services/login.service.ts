import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /** A URL da API */
  private readonly api = `${environment.api}`;

  /**
   * O construtor injeta o `HttpClient`api
   *
   * @param http Serviço de requisições HTTP
   */
  constructor(private http: HttpClient, private auth$: AuthService) {}

  /**
   * Este método recebe as credenciais do usuário (nome de usuário e senha)
   * e realiza uma requisição POST para a API, com o objetivo de obter
   * o "token" de autenticação (se for bem sucedida).
   *
   * @param email Nome do usuário
   * @param password Senha do usuário
   */
  login(email, password) {
    const data = { email, password };
    return this.http.post(this.api.concat('auth/login/'), data);
  }

  /**
   * Este método faz uma requisição POST para a API com o objetivo de
   * descartar o token.
   */
  logout() {
    const authData = this.auth$.get();
    try {
      const httpOptions = {
        headers: new HttpHeaders({
          authorization: 'Bearer ' + authData.accessToken,
        }),
      };
      return this.http.post(`${this.api}auth/logout/`, {}, httpOptions);
    } catch (e) {
      return false;
    }
  }
}
