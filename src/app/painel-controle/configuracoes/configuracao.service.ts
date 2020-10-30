import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {
  private readonly API =  `${environment.API}`;

  constructor(private http:HttpClient) { }




  configuracoes(){
    return this.http.get(`${this.API}config/logiclive/`)
  }

  criarModuloEndGame(){
    return this.http.post(`${this.API}config/logiclive/criar`,{})
  }
}
