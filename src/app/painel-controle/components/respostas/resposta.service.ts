/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespostasUsuariosResponse } from './interfacers';

@Injectable({
  providedIn: 'root',
})
export class RespostaService {
  private readonly api = `${environment.api}respostas/`;
  constructor(private http: HttpClient) {}

  listar(pg: number) {
    return this.http.get<RespostasUsuariosResponse>(`${this.api}?page=${pg}`);
  }
}
