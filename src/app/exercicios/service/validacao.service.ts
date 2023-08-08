/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Arvore } from 'src/app/common/models/arvore/arvore.model';
import { environment } from 'src/environments/environment';
import { ArvoreResponse, ExercicioValidacaoResponse, HashExecicioInput, ValidacaoResponse } from './interfaces';
import { No } from 'src/app/common/models/arvore/no.model.';

@Injectable({
  providedIn: 'root',
})
export class ValidacaoService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  validarResposta(arvore: Arvore) {
    return this.http
      .post<ValidacaoResponse>(`${this.api}exercicio/validacao/resposta/`, arvore)
      .pipe(take(1));
  }
  adicionarNo(arvore: Arvore) {
    return this.http
      .post<ArvoreResponse>(`${this.api}aluno/arvore/inicializacao/adiciona-no/`, arvore)
      .pipe(take(1));
  }

  adicionarNoNegando(xml: string, lista: No[], idNo: number, idExercicio: number, hash: HashExecicioInput) {
    return this.http
      .post<ArvoreResponse>(`${this.api}aluno/arvore/inicializacao/adiciona-no/`, {
        xml,
        inseridos: lista,
        idNo,
        negacao: true,
        idExercicio,
        ...hash
      })
      .pipe(take(1));
  }

  derivar(arvore: Arvore) {
    return this.http
      .post<ArvoreResponse>(`${this.api}aluno/arvore/derivacao/adiciona-no/`, arvore)
      .pipe(take(1));
  }

  ticarNo(arvore: Arvore) {
    return this.http
      .post<ArvoreResponse>(`${this.api}aluno/arvore/derivacao/ticar-no/`, arvore)
      .pipe(take(1));
  }

  fecharRamo(arvore: Arvore) {
    return this.http
      .post<ArvoreResponse>(`${this.api}aluno/arvore/derivacao/fechar-no/`, arvore)
      .pipe(take(1));
  }

  buscarExercicio(id: number, hash: HashExecicioInput) {
    return this.http
      .post<ExercicioValidacaoResponse>(`${this.api}exercicio/validacao/${id}`, hash)
      .pipe(take(1));
  }

  tentarNovamente(id: number, hash: HashExecicioInput) {
    return this.http
      .post<ExercicioValidacaoResponse>(`${this.api}exercicio/tentarnovamente/${id}`, {
        ...hash
      })
      .pipe(take(1));
  }
}
