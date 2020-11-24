import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConceitosService {
  private readonly API =  `${environment.API}`;
  constructor(
    private http:HttpClient
  ) { }



  concluir(hash,id){
    return this.http.post(`${this.API}aluno/conceitos/concluir/${id}`,{'usu_hash': hash}).pipe(take(1));
  }

}
    