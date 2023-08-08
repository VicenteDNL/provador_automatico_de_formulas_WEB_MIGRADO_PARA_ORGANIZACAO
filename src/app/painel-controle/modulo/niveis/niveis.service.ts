/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {take } from 'rxjs/operators';
import {Response, NiveisResponse, NivelInput, NivelResponse, RecompensasResponse, NiveisPaginationResponse } from './interfaces';
import { BaseResponse } from '../../../common/models/baseResponse';

@Injectable({
  providedIn: 'root',
})
export class NiveisService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  listar(pg: number) {
    return this.http.get<NiveisPaginationResponse>(`${this.api}mvflp/niveis/?page=${pg}`);
  }

  todasRecompensas() {
    return this.http.get<RecompensasResponse>(`${this.api}recompensas`).pipe(take(1));
  }

  cadastrar(nivel: NivelInput) {
    return this.http.post<Response>(`${this.api}mvflp/niveis/`, nivel);
  }

  buscarPorId(id: number) {
    return this.http.get<NivelResponse>(`${this.api}mvflp/niveis/${id}`).pipe(take(1));
  }

  editar(nivel: NivelInput) {
    return this.http.put<Response>(`${this.api}mvflp/niveis/${nivel.id}/`, nivel);
  }

  deletar(id: number) {
    return this.http.delete<Response>(`${this.api}mvflp/niveis/${id}/`);
  }
}
