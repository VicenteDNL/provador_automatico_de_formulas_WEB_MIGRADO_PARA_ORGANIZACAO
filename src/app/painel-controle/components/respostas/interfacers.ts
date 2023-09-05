import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';
import { PaginationResponse } from 'src/app/common/interfaces/paginationResponse.model';
import { RespostasUsuarios } from 'src/app/common/interfaces/respostasUsuarios.model';

export type Response = BaseResponse;

export interface RespostasUsuariosResponse extends Response {
  data?: PaginationResponse<RespostasUsuarios[]>;
}
