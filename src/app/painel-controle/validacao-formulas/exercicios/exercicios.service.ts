import { Injectable } from '@angular/core';
import { Niveis } from '../../models/niveis.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Exercicio } from '../../models/exercicio.model';
import { BaseResponse } from '../../models/baseResponse';
import { Arvore } from '../../models/arvore/arvore';
import { PaginationResponse } from '../../models/paginationResponse';
import { Recompensa } from '../../models/recompensa.model';

interface ArvoreResponse extends BaseResponse {
 data: Arvore;
}

interface ExercicioResponse extends BaseResponse {
  data: PaginationResponse<Exercicio[]>;
}

interface TodasNiveisResponse extends BaseResponse {
  data: Niveis[];
}

interface TodasRecompensasResponse extends BaseResponse {
  data: Recompensa[];
}

@Injectable({
  providedIn: 'root',
})
export class ExerciciosService {
  private readonly api = `${environment.api}`;

  constructor(private http: HttpClient) {}

  listarNiveis() {
    return this.http.get<TodasNiveisResponse>(`${this.api}mvflp/niveis/listarTodos`);
  }

  buscarExerciciosPorNivel(id, pg) {
    return this.http
      .get<ExercicioResponse>(`${this.api}mvflp/exercicio/nivel/${id}?page=${pg}`)
      .pipe(take(1));
  }

  deletar(id) {
    return this.http.delete(`${this.api}mvflp/exercicio/${id}/`);
  }

  buscarPorId(id) {
    return this.http.get(`${this.api}mvflp/exercicio/${id}/`).pipe(take(1));
  }

  editar(id, dado) {
    return this.http.put(`${this.api}mvflp/exercicio/${id}/`, dado);
  }

  todasRecompensas() {
    return this.http.get<TodasRecompensasResponse>(`${this.api}recompensas`).pipe(
      map(response => {
        if (response.success === true) {
          return response.data;
        } else {
          return response;
        }
      }),
    );
  }

  cadastrarExercicio(exer: Exercicio) {
    return this.http.post(`${this.api}mvflp/exercicio/`, exer);
  }

  arvoreOtimizada(xml, width = 700) {
    return this.http
      .post<ArvoreResponse>(`${this.api}arvore/otimizada/`, { xml, width })
      .pipe(take(1));
  }

  buscarInicioArvore(xml) {
    return this.http
      .post(`${this.api}arvore/inicializacao/premisas-conclucao/`, { xml })
      .pipe(take(1));
    // return this.http.post(`${this.API}arvore/inicializada/`,{'xml':xml, 'lista':lista}).pipe(take(1));
  }

  adicionarNo(dado) {
    return this.http
      .post(`${this.api}arvore/inicializacao/adiciona-no/`, dado)
      .pipe(take(1));
  }

  derivar(derivar) {
    return this.http
      .post(`${this.api}arvore/derivacao/adiciona-no/`, derivar)
      .pipe(take(1));
  }

  ticarNo(ticarNo) {
    return this.http
      .post(`${this.api}arvore/derivacao/ticar-no/`, ticarNo)
      .pipe(take(1));
  }

  fecharRamo(fecharNo) {
    return this.http
      .post(`${this.api}arvore/derivacao/fechar-no/`, fecharNo)
      .pipe(take(1));
  }
}
