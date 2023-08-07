import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RecompensaInput, RecompensaResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecompensaService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  cadastrarRecompensa(recompensa: RecompensaInput) {
    recompensa.imagem = 'vazio';
    return this.http.post<RecompensaResponse>(`${this.api}recompensas/`, recompensa);
  }

  editarRecompensa(recompensa: RecompensaInput) {
    recompensa.imagem = 'vazio';
    return this.http.put<RecompensaResponse>(
      `${this.api}recompensas/${recompensa.id}/`,
      recompensa,
    );
  }

  deletarRecompensa(id: number) {
    return this.http.delete<RecompensaResponse>(`${this.api}recompensas/${id}/`);
  }

  todasRecompensas() {
    return this.http.get<RecompensaResponse>(`${this.api}recompensas`).pipe(take(1));
  }
}
