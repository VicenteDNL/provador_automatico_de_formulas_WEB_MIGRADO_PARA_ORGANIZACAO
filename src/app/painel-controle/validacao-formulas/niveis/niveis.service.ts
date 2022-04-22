import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Niveis } from '../../models/niveis.model';
import { map, take } from 'rxjs/operators';
import { BaseResponse } from '../../models/baseResponse';
import { PaginationResponse } from '../../models/paginationResponse';
import { Recompensa } from '../../models/recompensa.model';

interface NiveisResponse extends BaseResponse{
  success: boolean;
  msg: string;
  data: PaginationResponse<Niveis[]>;
};

interface RecompensaResponse extends BaseResponse{
  success: boolean;
  msg: string;
  data: Recompensa[];
};


@Injectable({
  providedIn: 'root',
})
export class NiveisService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  listar(pg) {
    return this.http.get<NiveisResponse>(`${this.api}mvflp/niveis/?page=${pg}`);
  }

  todasRecompensas() {
    return this.http.get<RecompensaResponse>(`${this.api}recompensas`).pipe(take(1));
  }

  cadastrar(nivel: Niveis) {
    return this.http.post(`${this.api}mvflp/niveis/`, nivel);
  }

  buscarPorId(id) {
    return this.http.get(`${this.api}mvflp/niveis/${id}`).pipe(take(1));
  }

  editar(nivel: Niveis) {
    return this.http.put(`${this.api}mvflp/niveis/${nivel.id}/`, nivel);
  }

  deletar(id) {
    return this.http.delete(`${this.api}mvflp/niveis/${id}/`);
  }
}
