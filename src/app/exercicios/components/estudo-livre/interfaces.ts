import { Arvore } from 'src/app/common/interfaces/arvore/arvore.model';
import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';

export type Response = BaseResponse;

export interface ConcluirEstudoLivreInput {
  usuHash: string;
  exeHash: string;
  arvore: Arvore;
}
export interface ArvoreResponse extends Response {
  data?: Arvore;
}
