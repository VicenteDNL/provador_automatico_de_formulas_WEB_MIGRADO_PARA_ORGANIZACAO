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


  validarResposta( dado){
    return this.http.post(`${this.API}exercicio/validacao/resposta/`,dado).pipe(take(1));
  }
  adicionarNo(dado){
    return this.http.post(`${this.API}aluno/arvore/inicializacao/adiciona-no/`,dado).pipe(take(1));
  }

  adicionarNoNegando(xml,lista,id,idExercicio,hash){
    return this.http.post(`${this.API}aluno/arvore/inicializacao/adiciona-no/`,{'xml':xml,'inseridos':lista,'idNo':id, 'negacao':true,'idExercicio':idExercicio,'usu_hash': hash['usu_hash'],'exe_hash':hash['exe_hash']}).pipe(take(1));
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
  

  buscarExercicios(id,hash){
  
    return this.http.post(`${this.API}exercicio/validacao/${id}`,{'usu_hash': hash['usu_hash'],'exe_hash':hash['exe_hash']}).pipe(take(1))
    
  }


  tentarNovamente(id,usu_hash,exe_hash){
    return this.http.post(`${this.API}exercicio/tentarnovamente/${id}`,{'usu_hash':usu_hash,'exe_hash':exe_hash}).pipe(take(1));
  }



}
