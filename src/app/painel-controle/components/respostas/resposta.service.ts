/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ExerciciosResponse,
  JogadoresResponse,
  NiveisResponse,
  RespostasUsuariosResponse,
} from './interfacers';

@Injectable({
  providedIn: 'root',
})
export class RespostaService {
  private readonly api = `${environment.api}respostas/`;
  constructor(private http: HttpClient) {}

  listar(pg: number, search: any) {
    return this.http.post<RespostasUsuariosResponse>(
      `${this.api}?page=${pg}`,
      search,
    );
  }

  jogadores() {
    return this.http.get<JogadoresResponse>(`${environment.api}jogadores/all`);
  }

  exercicios() {
    return this.http.get<ExerciciosResponse>(
      `${environment.api}exercicios/all`,
    );
  }

  niveis() {
    return this.http.get<NiveisResponse>(`${environment.api}niveis/all`);
  }
}
