/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../../../common/models/baseResponse.model';
import { PaginationResponse } from '../../models/paginationResponse';
import { RespostasUsuarios } from '../../models/respostasUsuarios';


interface RespostasUsuariosResponse extends BaseResponse{
  success: boolean;
  msg: string;
  data: PaginationResponse<RespostasUsuarios[]>;
};

@Injectable({
  providedIn: 'root',
})
export class RespostaService {
  private readonly api = `${environment.api}`;
  constructor(private http: HttpClient) {}

  buscarRespostas() {
    return this.http.get<RespostasUsuariosResponse>(`${this.api}mvflp/resposta/`);
  }
}
