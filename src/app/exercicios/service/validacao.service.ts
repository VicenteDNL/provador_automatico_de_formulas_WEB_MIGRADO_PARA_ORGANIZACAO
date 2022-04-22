import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { BaseResponse } from 'src/app/painel-controle/models/baseResponse';
import { environment } from 'src/environments/environment';

interface ValidacaoResponse extends BaseResponse {
data: {
  tempo: {
    minutos: number;
    segundos: number;
  };
  erros: number;
  pontuacao: {
    ponto: number;
    maximo: number;
  };
};
}

@Injectable({
  providedIn: 'root',
})
export class ValidacaoService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  validarResposta(dado) {
    return this.http
      .post<ValidacaoResponse>(`${this.api}exercicio/validacao/resposta/`, dado)
      .pipe(take(1));
  }
  adicionarNo(dado) {
    return this.http
      .post(`${this.api}aluno/arvore/inicializacao/adiciona-no/`, dado)
      .pipe(take(1));
  }

  adicionarNoNegando(xml, lista, id, idExercicio, hash) {
    return this.http
      .post(`${this.api}aluno/arvore/inicializacao/adiciona-no/`, {
        xml,
        inseridos: lista,
        idNo: id,
        negacao: true,
        idExercicio,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        usu_hash: hash.usu_hash,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        exe_hash: hash.exe_hash,
      })
      .pipe(take(1));
  }

  derivar(derivar) {
    return this.http
      .post(`${this.api}aluno/arvore/derivacao/adiciona-no/`, derivar)
      .pipe(take(1));
  }

  ticarNo(ticarNo) {
    return this.http
      .post(`${this.api}aluno/arvore/derivacao/ticar-no/`, ticarNo)
      .pipe(take(1));
  }

  fecharRamo(fecharNo) {
    return this.http
      .post(`${this.api}aluno/arvore/derivacao/fechar-no/`, fecharNo)
      .pipe(take(1));
  }

  buscarExercicios(id, hash) {
    return this.http
      .post<{success: boolean; msg: string; data: any}>(`${this.api}exercicio/validacao/${id}`, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        usu_hash: hash.usu_hash,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        exe_hash: hash.exe_hash,
      })
      .pipe(take(1));
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  tentarNovamente(id, usu_hash, exe_hash) {
    return this.http
      .post(`${this.api}exercicio/tentarnovamente/${id}`, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        usu_hash,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        exe_hash,
      })
      .pipe(take(1));
  }
}
