/* eslint-disable @typescript-eslint/naming-convention */
import { Arvore } from 'src/app/common/models/arvore/arvore';
import { BaseResponse } from 'src/app/common/models/baseResponse';
import { Exercicio } from 'src/app/common/models/exercicio.model';
import { Tentativas } from 'src/app/common/models/tentativas';

export type Response = BaseResponse;

export interface ValidacaoResponse extends Response {
  data: Tentativas;
}

export interface HashExecicioInput {
  usu_hash: string;
  exe_hash: string;
}

export interface ExercicioValidacaoResponse extends Response{
  data?: {
    arvore: Arvore;
    exercicio: Exercicio;
    tentativas: Tentativas;
  };
}

export interface ArvoreResponse extends Response{
    data?: Arvore;
}
