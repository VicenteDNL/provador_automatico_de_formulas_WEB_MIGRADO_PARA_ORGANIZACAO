import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExercicioValidacaoResponse, HashInput } from './interfaces';
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
  private readonly api = `${environment.api}aluno/validacao-formula`;
  constructor(private http: HttpClient) {}

  buscarExercicio(hash: HashInput) {
    return this.http
      .post<ExercicioValidacaoResponse>(`${this.api}`, hash)
      .pipe(take(1));
  }

  adicionar(arvore: Arvore, passo: PassoInicializacao) {
    return this.http
      .post<ExercicioValidacaoResponse>(`${this.api}adiciona/`, {
        arvore,
        passo: { idNo: passo.no.id, negacao: passo.negacao },
      })
      .pipe(take(1));
  }

  derivar(arvore: Arvore, passo: PassoDerivacao) {
    return this.http
      .post<ExercicioValidacaoResponse>(`${this.api}deriva/`, {
        arvore,
        passo: {
          idsNoInsercoes: passo.nosInsercoes.map(p => p.idNo),
          idNoDerivacao: passo.noDerivacao.idNo,
          regra: passo.regra.codigo,
        },
      })
      .pipe(take(1));
  }

  ticar(arvore: Arvore, passo: PassoTicagem) {
    return this.http
      .post<ExercicioValidacaoResponse>(`${this.api}tica/`, {
        arvore,
        passo: { idNo: passo.no.idNo },
      })
      .pipe(take(1));
  }

  fechar(arvore: Arvore, passo: PassoFechamento) {
    return this.http
      .post<ExercicioValidacaoResponse>(`${this.api}fecha/`, {
        arvore,
        passo: {
          idNoFolha: passo.noFolha.idNo,
          idNoContraditorio: passo.noContraditorio.idNo,
        },
      })
      .pipe(take(1));
  }

  validar(arvore: Arvore, passo: PassoFinalizar) {
    return this.http
      .post<ExercicioValidacaoResponse>(
        `${this.api}exercicio/validacao/resposta/`,
        { arvore, passo },
      )
      .pipe(take(1));
  }
}
