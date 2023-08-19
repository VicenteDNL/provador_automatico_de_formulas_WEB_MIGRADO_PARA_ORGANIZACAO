import { Injectable } from '@angular/core';
import { Auth, AuthResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  keyname = 'arvore-refutacao-auth-data';
  redirectUrl: string;

  constructor() {}


  setLocalStorage(auth: Auth) {
    localStorage.setItem(this.keyname, JSON.stringify(auth));
  }

  getLocalStorage() {
    const dataJson = localStorage.getItem(this.keyname);
    if (dataJson) {
      const data = JSON.parse(dataJson) as Auth;
      return data;
    }
    return null;

  }

  /**
   * Remove as informações de autenticação do `LocalStorage`.
   */
  cleanLocalStorage() {
    localStorage.removeItem(this.keyname);
  }
}
