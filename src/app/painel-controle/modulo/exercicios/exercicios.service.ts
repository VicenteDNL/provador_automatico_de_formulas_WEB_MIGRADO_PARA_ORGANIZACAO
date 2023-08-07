/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import {Response, ArvoreResponse, ExercicioInput, ExerciciosPaginationResponse, ExercicioResponse, NiveisResponse,
      RecompensasResponse} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExerciciosService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  listarNiveis() {
    return this.http.get<NiveisResponse>(`${this.api}mvflp/niveis/listarTodos`);
  }

  buscarExerciciosPorNivel(id: number, pg: number) {
    return this.http
      .get<ExerciciosPaginationResponse>(`${this.api}mvflp/exercicio/nivel/${id}?page=${pg}`)
      .pipe(take(1));
  }

  deletar(id: number) {
    return this.http.delete<Response>(`${this.api}mvflp/exercicio/${id}/`);
  }

  buscarPorId(id: number) {
    return this.http.get<ExercicioResponse>(`${this.api}mvflp/exercicio/${id}/`).pipe(take(1));
  }

  editar(exer: ExercicioInput) {
    return this.http.put<Response>(`${this.api}mvflp/exercicio/${exer.id}/`, exer);
  }

  todasRecompensas() {
    return this.http.get<RecompensasResponse>(`${this.api}recompensas`).pipe((take(1)));
  }

  cadastrarExercicio(exer: ExercicioInput) {
    return this.http.post<Response>(`${this.api}mvflp/exercicio/`, exer);
  }

  arvoreOtimizada(xml: string, width = 700) {
    return this.http
      .post<ArvoreResponse>(`${this.api}arvore/otimizada/`, { xml, width })
      .pipe(take(1));
  }

  buscarInicioArvore(xml: string) {
    return this.http
      .post(`${this.api}arvore/inicializacao/premisas-conclucao/`, { xml })
      .pipe(take(1));
  }

  adicionarNo(dado) {
    return this.http
      .post(`${this.api}arvore/inicializacao/adiciona-no/`, dado)
      .pipe(take(1));
  }

  derivar(derivar) {
    return this.http
      .post(`${this.api}arvore/derivacao/adiciona-no/`, derivar)
      .pipe(take(1));
  }

  ticarNo(ticarNo) {
    return this.http
      .post(`${this.api}arvore/derivacao/ticar-no/`, ticarNo)
      .pipe(take(1));
  }

  fecharRamo(fecharNo) {
    return this.http
      .post(`${this.api}arvore/derivacao/fechar-no/`, fecharNo)
      .pipe(take(1));
  }
}
