import { Recompensa } from 'src/app/common/models/recompensa.model';
import { BaseResponse } from '../../../common/models/baseResponse';

export type Response = BaseResponse;

export interface RecompensasResponse extends Response{
  data?: Recompensa[];
};

export interface RecompensaInput {
  id?: number;
  nome: string;
  imagem?: string;
  pontuacao: number;
}
