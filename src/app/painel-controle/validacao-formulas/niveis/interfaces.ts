/* eslint-disable @typescript-eslint/naming-convention */
import { BaseResponse } from '../../models/baseResponse';
import { Nivel } from '../../models/nivel.model';
import { PaginationResponse } from '../../models/paginationResponse';
import { Recompensa } from '../../models/recompensa.model';

export interface NiveisResponse extends BaseResponse{
    data?: PaginationResponse<Nivel[]>;
  };

  export interface NivelResponse extends BaseResponse{
    data?: Nivel;
  };

  export interface RecompensaResponse extends BaseResponse{
    data?: Recompensa[];
  };

  export interface NivelInput {
    id?: number;
    nome: string;
    id_recompensa?: number;
    descricao: string;
    ativo: boolean;
  }
