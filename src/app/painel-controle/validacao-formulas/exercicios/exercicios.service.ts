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


  buscarExerciciosPorNivel(id){
    return this.http.get<Niveis[]>(`${this.API}mvflp/exercicio/nivel/${id}`).pipe(take(1));
  }

  deletar(id){
    return this.http.delete(`${this.API}mvflp/exercicio/${id}/`);
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

  cadastrar(exer:Exercicio){
    return this.http.post(`${this.API}mvflp/exercicio/`,exer)
  }

}
