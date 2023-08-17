/* eslint-disable @typescript-eslint/naming-convention */
import { Arvore } from 'src/app/common/models/arvore/arvore.model';
import { ArvoreAutomatica } from 'src/app/common/models/arvore/arvoreAutomatica';
import { BaseResponse } from 'src/app/common/models/baseResponse.model';
import { Exercicio } from 'src/app/common/models/exercicio.model';
import { Tentativas } from 'src/app/common/models/tentativas.model';

export type Response = BaseResponse;

export interface ArvoreResponse extends Response {
  data?: Arvore;
 }


 export interface ArvoreAutomaticaResponse extends Response {
  data: ArvoreAutomatica;
 }
