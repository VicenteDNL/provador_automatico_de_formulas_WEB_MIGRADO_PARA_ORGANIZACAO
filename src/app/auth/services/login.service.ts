import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /** A URL da API */
  ;
  private readonly API_ROOT =  `${environment.API}`;

  /**
   * O construtor injeta o `HttpClient`
   *
   * @param http Serviço de requisições HTTP
   */
  constructor(
              private http: HttpClient,
              private auth$: AuthService,
              
              ) {
  }

  /**
   * Este método recebe as credenciais do usuário (nome de usuário e senha)
   * e realiza uma requisição POST para a API, com o objetivo de obter
   * o "token" de autenticação (se for bem sucedida).
   *
   * @param email Nome do usuário
   * @param password Senha do usuário
   */
  login(email, password) {
    const data = { email, password};
    return this.http.post(this.API_ROOT.concat('auth/login/'), data);
  }

  /**
   * Este método faz uma requisição POST para a API com o objetivo de
   * descartar o token.
   */
  logout() {
    let authData = this.auth$.get();
    try {
      const httpOptions = {headers: new HttpHeaders({'Authorization': "Bearer " + authData['access_token']})};
      return this.http.post(`${this.API_ROOT}auth/logout/`, {},httpOptions);
    }
    catch (e) {
      return false
    }
  }

    
  
}
