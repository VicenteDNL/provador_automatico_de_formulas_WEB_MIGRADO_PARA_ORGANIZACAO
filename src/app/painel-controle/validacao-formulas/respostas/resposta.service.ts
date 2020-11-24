import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {
  private readonly API =  `${environment.API}`;
  constructor(private http:HttpClient) { }

  buscarRespostas(){
    return this.http.get(`${this.API}mvflp/resposta/`)
  }

}



