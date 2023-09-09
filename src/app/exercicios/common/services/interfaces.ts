import { Arvore } from 'src/app/common/interfaces/arvore/arvore.model';
import { ArvoreAutomatica } from 'src/app/common/interfaces/arvore/arvoreAutomatica';
import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';

export type Response = BaseResponse;

export interface ArvoreResponse extends Response {
  data?: Arvore;
}

export interface ArvoreAutomaticaResponse extends Response {
  data: ArvoreAutomatica;
}
