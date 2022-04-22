import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracaoService {
  private readonly api = `${environment.api}`;

  constructor(private http: HttpClient) {}

  configuracoes() {
    return this.http.get<{success: boolean; msg: string;data: {sincronizados: boolean;msg: string}}>(`${this.api}config/logiclive/`);
  }

  criarModuloEndGame() {
    return this.http.post<{success: boolean; msg: string}>(`${this.api}config/logiclive/criar`, {});
  }

  limparModuloEndGame() {
    return this.http.post<{success: boolean; msg: string}>(`${this.api}config/logiclive/limpar`, {});
  }
}
