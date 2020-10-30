import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecompensaService {

  private readonly API =  `${environment.API}`;
  constructor(private http:HttpClient) { }


  cadastrarRecompensa(recompensa){
    recompensa.imagem='vazio'
    return this.http.post(`${this.API}recompensas/`,recompensa);
  }

  editarRecompensa(recompensa){
    recompensa.imagem='vazio'
    return this.http.put(`${this.API}recompensas/${recompensa.id}/`,recompensa);
  }

  deletarRecompensa(recompensa){
    recompensa.imagem='vazio'
    return this.http.delete(`${this.API}recompensas/${recompensa.id}/`);
  }



  todasRecompensas(){
    return this.http.get(`${this.API}recompensas`).pipe(map((response) => {
      if (response['success']==true) {
        return response['data'];
      } else {
        return response;

      }
    }))
  }
}
