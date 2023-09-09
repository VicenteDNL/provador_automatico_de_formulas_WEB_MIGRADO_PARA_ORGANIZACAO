import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConcluirEstudoLivreInput, Response } from './interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EstudoLivreService {
  private readonly api = `${environment.api}aluno/estudo-livre/concluir`;
  constructor(private http: HttpClient) {}

  concluir(data: ConcluirEstudoLivreInput) {
    return this.http.post<Response>(`${this.api}`, data).pipe(take(1));
  }
}
