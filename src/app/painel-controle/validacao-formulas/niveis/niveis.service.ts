import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Niveis } from '../../models/niveis.model';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NiveisService {
  private readonly API =  `${environment.API}`;
  constructor(
              private http:HttpClient
              ) { }


  listar(pg){
    return this.http.get<Niveis[]>(`${this.API}mvflp/niveis/?page=${pg}`)
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

  cadastrar(nivel:Niveis){
    return this.http.post(`${this.API}mvflp/niveis/`,nivel)
  }


  buscarPorId(id){
    return this.http.get(`${this.API}mvflp/niveis/${id}`).pipe(take(1));
  }

  editar(nivel:Niveis){
    return this.http.put(`${this.API}mvflp/niveis/${nivel.id}/`,nivel);
  }

  deletar(id){
    return this.http.delete(`${this.API}mvflp/niveis/${id}/`);
  }





}



