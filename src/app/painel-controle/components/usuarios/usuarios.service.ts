import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Response,
  UsuarioInput,
  UsuarioPaginationResponse,
  UsuarioResponse,
} from './interface';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly api = `${environment.api}usuarios`;
  constructor(private http: HttpClient) {}

  listar(pg: number) {
    return this.http.get<UsuarioPaginationResponse>(`${this.api}?page=${pg}`);
  }

  deletar(id: number) {
    return this.http.delete<Response>(`${this.api}/${id}`);
  }

  cadastrar(user: UsuarioInput) {
    return this.http.post<Response>(`${this.api}`, user);
  }

  buscar(id: number) {
    return this.http.get<UsuarioResponse>(`${this.api}/${id}`).pipe(take(1));
  }

  editar(user: UsuarioInput) {
    return this.http.put<Response>(`${this.api}/${user.id}/`, user);
  }
}
