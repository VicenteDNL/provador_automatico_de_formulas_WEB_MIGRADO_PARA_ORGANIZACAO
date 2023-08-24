import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArvoreOtimizadaResponse } from './interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InicioService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  arvore(xml: string, width = 200) {
    return this.http
      .post<ArvoreOtimizadaResponse>(`${this.api}arvore/otimizada/`, {
        xml,
        width,
        exibirLinhas: false,
      })
      .pipe(take(1));
  }
}
