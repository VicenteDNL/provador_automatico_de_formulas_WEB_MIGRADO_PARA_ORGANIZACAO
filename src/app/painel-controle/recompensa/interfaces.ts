import { BaseResponse } from '../models/baseResponse';
import { Recompensa } from '../models/recompensa.model';

export interface RecompensaResponse extends BaseResponse{
  data?: Recompensa[];
};

export interface RecompensaInput {
  id?: number;
  nome: string;
  imagem?: string;
  pontuacao: number;
}
