/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConcluirEstudoConceitosInput, Response } from './interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EstudoConceitosService {
  private readonly api = `${environment.api}aluno/estudo-conceitos/concluir`;
  constructor(private http: HttpClient) {}

  concluir(data: ConcluirEstudoConceitosInput) {
    return this.http.post<Response>(`${this.api}`, data).pipe(take(1));
  }
}
