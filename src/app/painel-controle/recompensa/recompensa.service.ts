import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseResponse';
import { Recompensa } from '../models/recompensa.model';

interface RecompensaResponse extends BaseResponse{
  success: boolean;
  msg: string;
  data: Recompensa[];
};

@Injectable({
  providedIn: 'root',
})
export class RecompensaService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  cadastrarRecompensa(recompensa) {
    recompensa.imagem = 'vazio';
    return this.http.post<RecompensaResponse>(`${this.api}recompensas/`, recompensa);
  }

  editarRecompensa(recompensa) {
    recompensa.imagem = 'vazio';
    return this.http.put<RecompensaResponse>(
      `${this.api}recompensas/${recompensa.id}/`,
      recompensa,
    );
  }

  deletarRecompensa(recompensa) {
    recompensa.imagem = 'vazio';
    return this.http.delete<RecompensaResponse>(`${this.api}recompensas/${recompensa.id}/`);
  }

  todasRecompensas() {
    return this.http.get<RecompensaResponse>(`${this.api}recompensas`).pipe(
      map(response => {
        if (response.success === true) {
          return response.data;
        } else {
          return response;
        }
      }),
    );
  }
}
