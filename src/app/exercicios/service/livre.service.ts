import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Arvore } from 'src/app/common/models/arvore/arvore.model';
import { BaseResponse } from 'src/app/common/models/baseResponse.model';
import { environment } from 'src/environments/environment';

interface ArvoreResponse extends BaseResponse {
  data: Arvore;
 }


 interface IniciarResponse extends BaseResponse {
  data: {
    arvore: Arvore;
  };
 }


@Injectable({
  providedIn: 'root',
})
export class LivreService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  adicionarNo(dado) {
    return this.http
      .post(`${this.api}aluno/livre/adiciona/`, dado)
      .pipe(take(1));
  }

  derivar(derivar) {
    return this.http
      .post(`${this.api}aluno/livre/deriva/`, derivar)
      .pipe(take(1));
  }

  ticarNo(ticarNo) {
    return this.http
      .post(`${this.api}aluno/livre/tica/`, ticarNo)
      .pipe(take(1));
  }

  fecharRamo(fecharNo) {
    return this.http
      .post(`${this.api}aluno/livre/fecha/`, fecharNo)
      .pipe(take(1));
  }

  arvoreOtimizada(xml, width = 700) {
    return this.http
      .post<ArvoreResponse>(`${this.api}aluno/livre/arvore/`, { xml, width })
      .pipe(take(1));
  }

  iniciar(xml) {
    return this.http
      .post<any>(`${this.api}aluno/livre/iniciar/`, { xml })
      .pipe(take(1));
  }
}
