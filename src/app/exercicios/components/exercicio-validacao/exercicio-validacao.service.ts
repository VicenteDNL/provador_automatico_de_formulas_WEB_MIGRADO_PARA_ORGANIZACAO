/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExercicioValidacaoResponse, HashInput, Response } from './interfaces';
import { take } from 'rxjs/operators';
import { Arvore } from 'src/app/common/interfaces/arvore/arvore.model';
import { PassoInicializacao } from 'src/app/common/interfaces/passo/passoInicializacao';
import { PassoDerivacao } from 'src/app/common/interfaces/passo/passoDerivacao';
import { PassoTicagem } from 'src/app/common/interfaces/passo/passoTicagem';
import { PassoFechamento } from 'src/app/common/interfaces/passo/passoFechamento';
import { PassoFinalizar } from 'src/app/common/interfaces/passo/PassoFinalizar';

@Injectable({
  providedIn: 'root',
})
export class ExercicioValidacaoService {
  private readonly api = `${environment.api}aluno/validacao-formula/`;
  private header = (hash: HashInput) => ({
    headers: new HttpHeaders({
      jogadorhash: hash.usuHash,
      exerciciohash: hash.exeHash,
    }),
  });
  constructor(private http: HttpClient) {}

  iniciar(hash: HashInput) {
    return this.http
      .get<ExercicioValidacaoResponse>(`${this.api}inicia`, this.header(hash))
      .pipe(take(1));
  }

  adicionar(arvore: Arvore, passo: PassoInicializacao, hash: HashInput) {
    return this.http
      .post<ExercicioValidacaoResponse>(
        `${this.api}adiciona`,
        {
          arvore,
          passo: { idNo: passo.no.id, negacao: passo.negacao },
        },
        this.header(hash),
      )
      .pipe(take(1));
  }

  derivar(arvore: Arvore, passo: PassoDerivacao, hash: HashInput) {
    return this.http
      .post<ExercicioValidacaoResponse>(
        `${this.api}deriva`,
        {
          arvore,
          passo: {
            idsNoInsercoes: passo.nosInsercoes.map(p => p.idNo),
            idNoDerivacao: passo.noDerivacao.idNo,
            regra: passo.regra.codigo,
          },
        },
        this.header(hash),
      )
      .pipe(take(1));
  }

  ticar(arvore: Arvore, passo: PassoTicagem, hash: HashInput) {
    return this.http
      .post<ExercicioValidacaoResponse>(
        `${this.api}tica`,
        {
          arvore,
          passo: { idNo: passo.no.idNo },
        },
        this.header(hash),
      )
      .pipe(take(1));
  }

  fechar(arvore: Arvore, passo: PassoFechamento, hash: HashInput) {
    return this.http
      .post<ExercicioValidacaoResponse>(
        `${this.api}fecha`,
        {
          arvore,
          passo: {
            idNoFolha: passo.noFolha.idNo,
            idNoContraditorio: passo.noContraditorio.idNo,
          },
        },
        this.header(hash),
      )
      .pipe(take(1));
  }

  concluir(arvore: Arvore, passo: PassoFinalizar, hash: HashInput) {
    return this.http
      .post<Response>(
        `${this.api}concluir`,
        { arvore, passo },
        this.header(hash),
      )
      .pipe(take(1));
  }

  tentarNovamente(hash: HashInput) {
    return this.http
      .get<ExercicioValidacaoResponse>(
        `${this.api}tentar-novamente`,
        this.header(hash),
      )
      .pipe(take(1));
  }
}
