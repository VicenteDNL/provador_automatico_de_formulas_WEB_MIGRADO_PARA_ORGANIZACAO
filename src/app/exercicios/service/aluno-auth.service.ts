import { Injectable } from '@angular/core';

/**
 * A classe `AuthService` fornece um serviço que funciona como um controlador
 * do armazenamento de informações sobre autenticação do usuário.
 *
 * Para armazenar as informações o serviço utiliza o `LocalStorage`.
 *
 * Os dados são armazenados na chave `auth-data`.
 */
@Injectable({
  providedIn: 'root'
})
export class AlunoAuthService {
  keyname = 'modulo_arvore_de_refutacao_auth-data';
  redirectUrl: string;

  constructor() {
  }

  /**
   * Armazena as informações de autenticação no `LocalStorage`, convertendo o
   * parâmetro `data` (um objeto) para JSON.
   *
   * @param data As informações de autenticação
   */
  set(data) {
    localStorage.setItem(this.keyname, JSON.stringify(data));
  }

  /**
   * Retorna as informações de autenticação (se disponíveis).
   */
  get() {
    let data = localStorage.getItem(this.keyname);
    if (data) {
      data = JSON.parse(data);
     
    }
    return data;
  }

  /**
   * Retorna o identificador do usuário, se disponível.
   */
  getUserId() {
    let data = this.get();
    if (data) {
      return data['user']['id'];
    } else {
      return null;
    }
  }

  /**
   * Remove as informações de autenticação do `LocalStorage`.
   */
  clean() {
    localStorage.removeItem(this.keyname);
  }
}
