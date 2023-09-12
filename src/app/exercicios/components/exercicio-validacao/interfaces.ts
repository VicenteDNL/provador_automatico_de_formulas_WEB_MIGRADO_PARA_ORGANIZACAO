import { Arvore } from 'src/app/common/interfaces/arvore/arvore.model';
import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';
import { Exercicio } from 'src/app/common/interfaces/exercicio.model';
import { Saude } from 'src/app/common/interfaces/saude';

export type Response = BaseResponse;

export interface HashInput {
  usuHash: string;
  exeHash: string;
}

export interface ExercicioValidacaoResponse extends Response {
  data?: {
    arvore: Arvore;
    exercicio: Exercicio;
    saude: Saude;
  };
}
