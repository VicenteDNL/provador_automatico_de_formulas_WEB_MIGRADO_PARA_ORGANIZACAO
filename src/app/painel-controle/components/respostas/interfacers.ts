import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';
import { Exercicio } from 'src/app/common/interfaces/exercicio.model';
import { Jogador } from 'src/app/common/interfaces/jogador.models';
import { Nivel } from 'src/app/common/interfaces/nivel.model';
import { PaginationResponse } from 'src/app/common/interfaces/paginationResponse.model';
import { RespostasUsuarios } from 'src/app/common/interfaces/respostasUsuarios.model';

export type Response = BaseResponse;

export interface RespostasUsuariosResponse extends Response {
  data?: PaginationResponse<RespostasUsuarios[]>;
}

export interface JogadoresResponse extends Response {
  data?: Jogador[];
}

export interface ExerciciosResponse extends Response {
  data?: Exercicio[];
}

export interface NiveisResponse extends Response {
  data?: Nivel[];
}
