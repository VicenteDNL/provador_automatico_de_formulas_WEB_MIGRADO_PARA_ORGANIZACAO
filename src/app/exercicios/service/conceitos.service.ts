import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConceitosService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  concluir(hash, id) {
    return this.http
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .post<{success: boolean; msg: string}>(`${this.api}aluno/conceitos/concluir/${id}`, { usu_hash: hash })
      .pipe(take(1));
  }
}
