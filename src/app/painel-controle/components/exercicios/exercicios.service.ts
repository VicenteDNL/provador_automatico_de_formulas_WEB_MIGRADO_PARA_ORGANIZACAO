import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import {
  Response,
  ExercicioInput,
  ExerciciosPaginationResponse,
  ExercicioResponse,
  RecompensasResponse,
  NiveisResponse,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExerciciosService {
  private readonly api = `${environment.api}exercicios`;
  constructor(private http: HttpClient) {}

  listar(pg: number) {
    return this.http
      .get<ExerciciosPaginationResponse>(`${this.api}/?page=${pg}`)
      .pipe(take(1));
  }

  deletar(id: number) {
    return this.http.delete<Response>(`${this.api}/${id}`);
  }

  cadastrar(exer: ExercicioInput) {
    return this.http.post<Response>(`${this.api}`, exer);
  }

  buscar(id: number) {
    return this.http.get<ExercicioResponse>(`${this.api}/${id}`).pipe(take(1));
  }

  editar(exer: ExercicioInput) {
    return this.http.put<Response>(`${this.api}/${exer.id}`, exer);
  }

  recompensas() {
    return this.http
      .get<RecompensasResponse>(`${environment.api}recompensas`)
      .pipe(take(1));
  }

  niveis() {
    return this.http
      .get<NiveisResponse>(`${environment.api}niveis/all`)
      .pipe(take(1));
  }
}
