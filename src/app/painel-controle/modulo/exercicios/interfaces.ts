/* eslint-disable @typescript-eslint/naming-convention */
import { Exercicio } from 'src/app/common/models/exercicio.model';
import { Arvore } from '../../../common/models/arvore/arvore.model';
import { BaseResponse } from '../../../common/models/baseResponse.model';

import { Nivel } from 'src/app/common/models//nivel.model';
import { PaginationResponse } from 'src/app/common/models/paginationResponse.model';
import { Recompensa } from 'src/app/common/models//recompensa.model';

export type Response = BaseResponse;

export interface ArvoreResponse extends Response {
  data?: { impressao: Arvore};
 }

 export interface ExerciciosPaginationResponse extends Response {
   data?: PaginationResponse<Exercicio[]>;
 }

 export interface ExercicioResponse extends Response {
  data?: Exercicio;
}

 export interface NiveisResponse extends Response {
   data?: Nivel[];
 }

 export interface RecompensasResponse extends BaseResponse {
   data?: Recompensa[];
 }

 export interface ExercicioInput  {

  id?: number;
  nome: string;
  enunciado: string;
  descricao: string;
  tempo?: number;
  qndt_erros?: number;
  ativo: boolean;
  formula?: {
    formula: string;
    inicio_personalizado: boolean;
    iniciar_zerada: boolean;
    ticar_automaticamente: boolean;
    fechar_automaticamente: boolean;
    lista_derivacoes: any[];
    lista_fechamento: any[];
    lista_ticagem: any[];
    lista_passos: any[];
    inicializacao_completa: boolean;
    xml: string;
    quantidade_regras: number;
  };
  id_nivel: number;
  id_recompensa?: number;
}
