import { Injectable } from '@angular/core';
import { Niveis } from '../../models/niveis.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Exercicio } from '../../models/exercicio.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciciosService {
  private readonly API =  `${environment.API}`;

  constructor(
              private http:HttpClient
            ) { }


  listarNiveis(){
    return this.http.get<Niveis[]>(`${this.API}mvflp/niveis/listarTodos`)
  }

  buscarExerciciosPorNivel(id,pg){
    return this.http.get<Niveis[]>(`${this.API}mvflp/exercicio/nivel/${id}?page=${pg}`).pipe(take(1));
  }

  deletar(id){
    return this.http.delete(`${this.API}mvflp/exercicio/${id}/`);
  }

  buscarPorId(id){
    return this.http.get(`${this.API}mvflp/exercicio/${id}/`).pipe(take(1));

  }

  editar(id,dado){
    return this.http.put(`${this.API}mvflp/exercicio/${id}/`,dado);

  }

  todasRecompensas(){
    return this.http.get<Niveis[]>(`${this.API}recompensas`).pipe(map((response) => {
      if (response['success']==true) {
        return response['data'];
      } else {
        return response;

      }
    }))
  }

  cadastrarExercicio(exer:Exercicio){
    return this.http.post(`${this.API}mvflp/exercicio/`,exer)
  }

  arvoreOtimizada(xml , width=700 ){
    return this.http.post(`${this.API}arvore/otimizada/`,{'xml':xml, 'width':width}).pipe(take(1));

  }



  buscarInicioArvore(xml){
    return this.http.post(`${this.API}arvore/inicializacao/premisas-conclucao/`,{'xml':xml}).pipe(take(1));
  // return this.http.post(`${this.API}arvore/inicializada/`,{'xml':xml, 'lista':lista}).pipe(take(1));
  }

  adicionarNo(dado){
    return this.http.post(`${this.API}arvore/inicializacao/adiciona-no/`,dado).pipe(take(1));
  }

  derivar(derivar){
    return this.http.post(`${this.API}arvore/derivacao/adiciona-no/`,derivar).pipe(take(1));
  }

  ticarNo(ticarNo){
    return this.http.post(`${this.API}arvore/derivacao/ticar-no/`,ticarNo).pipe(take(1));

  }

  fecharRamo(fecharNo){
    return this.http.post(`${this.API}arvore/derivacao/fechar-no/`,fecharNo).pipe(take(1));
  }


  

}
