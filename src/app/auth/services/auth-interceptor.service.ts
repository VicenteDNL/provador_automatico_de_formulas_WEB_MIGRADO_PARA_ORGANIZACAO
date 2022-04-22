import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * A classe `AuthInterceptor` fornece um serviço que funciona como um "interceptador"
 * para requisições HTTP.
 *
 * Este interceptador, como o nome indica, é chamado a qualquer momento que houver uma
 * requisição HTTP (usando o `HttClient`) e a modifica, adicionando um cabeçalho
 * `Authorization` conforme as informações de autenticação (se disponíveis).
 *
 * Esta abordagem é interessante ao consumir APIs HTTP que necessitam do esquema
 * de autorização baseado no cabeçalho `Authorization`.
 *
 * @see AuthService
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * O construtor injeta o serviço `AuthService` para estar disponível para a classe.
   *
   * @param auth O serviço de autenticação
   */
  constructor(private auth: AuthService) {}

  /**
   * A sobrescrita desse método interage com o serviço `AuthService` para recuperar
   * as informações de autenticação e, se disponíveis, modifica o cabeçalho
   * da requisição e adiciona o cabeçalho `Authorization`, informando o "token"
   * armazenado.
   *
   * @param request A requisição
   * @param next A próxima requisição
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const data = this.auth.get();
    let token = '';
    if (data && data.accessToken) {
      token = data.accessToken;
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
