import { Recompensa } from 'src/app/common/interfaces/recompensa.model';
import { BaseResponse } from '../../../common/interfaces/baseResponse.model';

export type Response = BaseResponse;

export interface RecompensasResponse extends Response {
  data?: Recompensa[];
}

export interface RecompensaInput {
  id?: number;
  nome: string;
  imagem?: string;
  pontuacao: number;
}
