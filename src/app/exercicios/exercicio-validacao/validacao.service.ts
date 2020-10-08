import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService {
  private readonly API =  `${environment.API}`;
  constructor(
    private http:HttpClient
  ) { }



  adicionarNo(xml,lista,id,idExercicio){
    return this.http.post(`${this.API}aluno/arvore/inicializacao/adiciona-no/`,{'xml':xml,'lista':lista,'idNo':id, 'negacao':false, 'idExercicio':idExercicio}).pipe(take(1));
  }

  adicionarNoNegando(xml,lista,id,idExercicio){
    return this.http.post(`${this.API}aluno/arvore/inicializacao/adiciona-no/`,{'xml':xml,'lista':lista,'idNo':id, 'negacao':true,'idExercicio':idExercicio}).pipe(take(1));
  }


  derivar(derivar){
    return this.http.post(`${this.API}aluno/arvore/derivacao/adiciona-no/`,derivar).pipe(take(1));
  }

  ticarNo(ticarNo){
    return this.http.post(`${this.API}aluno/arvore/derivacao/ticar-no/`,ticarNo).pipe(take(1));

  }

  fecharRamo(fecharNo){
    return this.http.post(`${this.API}aluno/arvore/derivacao/fechar-no/`,fecharNo).pipe(take(1));
  }
  

  buscarExercicios(id){
    return this.http.get(`${this.API}exercicio/validacao/${id}/`).pipe(take(1));
  }


}
