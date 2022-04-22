import { Injectable } from '@angular/core';

/**
 * A classe `AuthService` fornece um serviço que funciona como um controlador
 * do armazenamento de informações sobre autenticação do usuário.
 *
 * Para armazenar as informações o serviço utiliza o `LocalStorage`.
 *
 * Os dados são armazenados na chave `auth-data`.
 */

type LocalStorageValue ={
    accessToken: string;
  email: string;
  success: boolean;
  tokenType: string;
};


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  keyname = 'auth-data';
  redirectUrl: string;

  constructor() {}

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
    const dataJson = localStorage.getItem(this.keyname);
    if (dataJson) {
      const data = JSON.parse(dataJson) as LocalStorageValue;
      return data;
    }
    return null;

  }

  /**
   * Retorna o identificador do usuário, se disponível.
   */
  getUserId() {
    const data = this.get();
    if (data) {
      return data.email;
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
