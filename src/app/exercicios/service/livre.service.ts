import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private readonly API =  `${environment.API}`;
  constructor(
    private http:HttpClient
  ) { }



  adicionarNo(dado){
    return this.http.post(`${this.API}aluno/livre/adiciona/`,dado).pipe(take(1));
  }

  derivar(derivar){
    return this.http.post(`${this.API}aluno/livre/deriva/`,derivar).pipe(take(1));
  }

  ticarNo(ticarNo){
    return this.http.post(`${this.API}aluno/livre/tica/`,ticarNo).pipe(take(1));
  }

  fecharRamo(fecharNo){
    return this.http.post(`${this.API}aluno/livre/fecha/`,fecharNo).pipe(take(1));
  }
  
  arvoreOtimizada(xml , width=700 ){
    return this.http.post(`${this.API}aluno/livre/arvore/`,{'xml':xml, 'width':width}).pipe(take(1));

  }

  iniciar(xml){
    return this.http.post(`${this.API}aluno/livre/iniciar/`,{'xml':xml}).pipe(take(1))
  }
    
}
