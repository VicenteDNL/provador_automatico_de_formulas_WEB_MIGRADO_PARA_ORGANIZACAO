import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response, RecompensaInput, RecompensasResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecompensaService {
  private readonly api = `${environment.api}recompensas`;
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<RecompensasResponse>(`${this.api}`).pipe(take(1));
  }

  deletar(id: number) {
    return this.http.delete<Response>(`${this.api}/${id}`);
  }

  cadastrar(recompensa: RecompensaInput) {
    recompensa.imagem = 'vazio';
    return this.http.post<Response>(`${this.api}`, recompensa);
  }

  editar(recompensa: RecompensaInput) {
    recompensa.imagem = 'vazio';
    return this.http.put<Response>(`${this.api}/${recompensa.id}`, recompensa);
  }
}
