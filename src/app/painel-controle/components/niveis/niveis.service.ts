import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import {
  Response,
  NivelInput,
  NivelResponse,
  RecompensasResponse,
  NiveisPaginationResponse,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class NiveisService {
  private readonly api = `${environment.api}niveis`;
  constructor(private http: HttpClient) {}

  listar(pg: number) {
    return this.http.get<NiveisPaginationResponse>(`${this.api}/?page=${pg}`);
  }

  deletar(id: number) {
    return this.http.delete<Response>(`${this.api}/${id}/`);
  }

  cadastrar(nivel: NivelInput) {
    return this.http.post<Response>(`${this.api}/`, nivel);
  }

  buscar(id: number) {
    return this.http.get<NivelResponse>(`${this.api}/${id}`).pipe(take(1));
  }

  editar(nivel: NivelInput) {
    return this.http.put<Response>(`${this.api}/${nivel.id}/`, nivel);
  }

  recompensas() {
    return this.http
      .get<RecompensasResponse>(`${environment.api}recompensas`)
      .pipe(take(1));
  }
}
