import { ArvoreAutomatica } from 'src/app/common/models/arvore/arvoreAutomatica';
import { BaseResponse } from 'src/app/common/models/baseResponse.model';

export type Response = BaseResponse;

export interface ArvoreOtimizadaResponse extends Response {
  data?: ArvoreAutomatica;
}
