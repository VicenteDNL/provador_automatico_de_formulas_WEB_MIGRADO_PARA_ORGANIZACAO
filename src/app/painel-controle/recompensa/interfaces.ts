import { BaseResponse } from '../models/baseResponse';
import { Recompensa } from '../models/recompensa.model';

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
