import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ExercicioResponse,
  ExerciciosResponse,
  GameResponse,
  GamesResponse,
  LogicLiveAtivoResponse,
  LogicLiveInfoResponse,
  ModuloResponse,
  ModulosResponse,
  NiveisResponse,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class LogicLiveService {
  private readonly api = `${environment.api}logiclive`;

  constructor(private http: HttpClient) {}

  info() {
    return this.http.get<LogicLiveInfoResponse>(`${this.api}/info`);
  }

  ativo() {
    return this.http.get<LogicLiveAtivoResponse>(`${this.api}/ativo`);
  }

  criarGame() {
    return this.http.post<GamesResponse>(`${this.api}/game`, null);
  }

  statusGame(id: number, ativo: { ativo: boolean }) {
    return this.http.post<GameResponse>(`${this.api}/game/${id}/ativo`, ativo);
  }

  criarModulos(idGame: number) {
    return this.http.post<ModulosResponse>(
      `${this.api}/game/${idGame}/modulos`,
      null,
    );
  }

  statusModulo(id: number, ativo: { ativo: boolean }) {
    return this.http.post<ModuloResponse>(
      `${this.api}/modulo/${id}/ativo`,
      ativo,
    );
  }

  criarNiveis(idModulo: number) {
    return this.http.post<NiveisResponse>(
      `${this.api}/modulos/${idModulo}/niveis`,
      null,
    );
  }
  statusNivel(id: number, ativo: { ativo: boolean }) {
    return this.http.post<ModuloResponse>(
      `${this.api}/nivel/${id}/ativo`,
      ativo,
    );
  }
  criarExercicios(idNivel: number) {
    return this.http.post<ExerciciosResponse>(
      `${this.api}/niveis/${idNivel}/exercicios`,
      null,
    );
  }
  statusExercicio(id: number, ativo: { ativo: boolean }) {
    return this.http.post<ExercicioResponse>(
      `${this.api}/exercicio/${id}/ativo`,
      ativo,
    );
  }
}
