/* eslint-disable @typescript-eslint/naming-convention */
import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';
import { PaginationResponse } from 'src/app/common/interfaces/paginationResponse.model';

export type Response = BaseResponse;
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  email_verificado: string;
  created_at: string;
  updated_at: string;
}

export interface UsuarioResponse extends Response {
  data?: Usuario;
}

export interface UsuarioInput {
  id?: number;
  nome: string;
  email: string;
  password: string;
  ativo: boolean;
}
export interface UsuarioPaginationResponse extends Response {
  data?: PaginationResponse<Usuario[]>;
}
