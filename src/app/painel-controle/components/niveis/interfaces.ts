/* eslint-disable @typescript-eslint/naming-convention */
import { BaseResponse } from '../../../common/interfaces/baseResponse.model';
import { Nivel } from 'src/app/common/interfaces/nivel.model';
import { PaginationResponse } from 'src/app/common/interfaces/paginationResponse.model';
import { Recompensa } from 'src/app/common/interfaces/recompensa.model';

export type Response = BaseResponse;

export interface NiveisPaginationResponse extends Response {
  data?: PaginationResponse<Nivel[]>;
}

export interface NiveisResponse extends Response {
  data?: Nivel[];
}

export interface NivelResponse extends Response {
  data?: Nivel;
}

export interface RecompensasResponse extends Response {
  data?: Recompensa[];
}

export interface NivelInput {
  id?: number;
  nome: string;
  recompensa_id?: number;
  descricao: string;
  ativo: boolean;
}
