/* eslint-disable @typescript-eslint/naming-convention */
import { BaseResponse } from '../../../common/models/baseResponse.model';
import { Nivel } from 'src/app/common/models/nivel.model';
import { PaginationResponse } from 'src/app/common/models/paginationResponse.model';
import { Recompensa } from 'src/app/common/models/recompensa.model';

export type Response = BaseResponse;

export interface NiveisPaginationResponse extends Response{
  data?: PaginationResponse<Nivel[]>;
};

export interface NiveisResponse extends Response{
  data?: Nivel[];
};

export interface NivelResponse extends Response{
  data?: Nivel;
};

export interface RecompensasResponse extends Response{
  data?: Recompensa[];
};

export interface NivelInput {
  id?: number;
  nome: string;
  id_recompensa?: number;
  descricao: string;
  ativo: boolean;
}
