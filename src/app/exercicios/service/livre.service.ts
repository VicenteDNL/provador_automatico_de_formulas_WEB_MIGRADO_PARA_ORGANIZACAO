import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArvoreAutomaticaResponse, ArvoreResponse } from './interfaces';
import { Arvore } from 'src/app/common/models/arvore/arvore.model';
import { PassoInicializacao } from 'src/app/common/models/passo/passoInicializacao';
import { PassoDerivacao } from 'src/app/common/models/passo/passoDerivacao';
import { PassoTicagem } from 'src/app/common/models/passo/passoTicagem';
import { PassoFechamento } from 'src/app/common/models/passo/passoFechamento';

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  private readonly api = `${environment.api}aluno/livre/`;
  constructor(private http: HttpClient) {}

  adicionar(arvore: Arvore, passo: PassoInicializacao) {
    return this.http
      .post<ArvoreResponse>(`${this.api}adiciona/`, {arvore, passo: {idNo:passo.no.id, negacao:passo.negacao}},)
      .pipe(take(1));
  }

  derivar(arvore: Arvore,passo: PassoDerivacao) {
    return this.http
      .post<ArvoreResponse>(
        `${this.api}deriva/`,
        {
          arvore,
          passo:{
            idsNoInsercoes:passo.nosInsercoes.map((p)=>p.idNo),
            idNoDerivacao:passo.noDerivacao.idNo,
            regra:passo.regra.codigo
          }
        })
      .pipe(take(1));

  }

  ticar(arvore: Arvore, passo: PassoTicagem) {
    return this.http
      .post<ArvoreResponse>(`${this.api}tica/`,
      {
        arvore,
        passo: {idNo:passo.no.idNo}
      })
      .pipe(take(1));
  }

  fechar(arvore: Arvore,passo: PassoFechamento) {
    return this.http
      .post<ArvoreResponse>(`${this.api}fecha/`,        {
        arvore,
        passo:{
          idNoFolha:passo.noFolha.idNo,
          idNoContraditorio:passo.noContraditorio.idNo,
        }
      })
      .pipe(take(1));
  }

  arvoreOtimizada(xml: string, width = 700) {
    return this.http
      .post<ArvoreAutomaticaResponse>(`${this.api}arvore/`, { xml, canvas:{width} })
      .pipe(take(1));
  }

  iniciar(xml: string, width = 700) {
    return this.http
      .post<ArvoreResponse>(`${this.api}inicia/`, { xml, canvas:{width} })
      .pipe(take(1));
  }
}
