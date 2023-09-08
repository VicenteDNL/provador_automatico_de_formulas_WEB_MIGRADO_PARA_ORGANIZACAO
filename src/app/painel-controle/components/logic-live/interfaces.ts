import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';

export type Response = BaseResponse;

export interface LogicLiveInfoResponse extends Response {
  data?: LogicLiveInfo;
}

export interface LogicLiveAtivoResponse extends Response {
  data?: { ativo: boolean };
}

export interface GamesResponse extends Response {
  data?: Game[];
}

export interface GameResponse extends Response {
  data?: Game;
}

export interface ModulosResponse extends Response {
  data?: Modulo[];
}

export interface ModuloResponse extends Response {
  data?: Modulo;
}

export interface NiveisResponse extends Response {
  data?: Nivel[];
}

export interface ExerciciosResponse extends Response {
  data?: Exercicio[];
}

export interface ExercicioResponse extends Response {
  data?: Exercicio;
}

export interface Game {
  id: number;
  nome: string | null;
  descricao: string | null;
  ativo: string | null;
  modulos: Modulo[];
}

export interface Modulo {
  id: number;
  nome: string | null;
  descricao: string | null;
  ativo: string | null;
  niveis: Nivel[];
}

export interface Nivel {
  id: number;
  nome: string | null;
  descricao: string | null;
  ativo: string | null;
  exercicios: Exercicio[];
}

export interface Exercicio {
  id: number;
  nome: string | null;
  descricao: string | null;
  ativo: string | null;
}

export interface LogicLiveInfo {
  games: Game[];

  // recompensas: {
  //   id: number;
  //   nome: string | null;
  // }[];
}
