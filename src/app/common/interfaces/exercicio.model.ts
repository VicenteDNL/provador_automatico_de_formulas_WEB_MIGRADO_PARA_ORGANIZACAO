/* eslint-disable @typescript-eslint/naming-convention */

import { Formula } from './formula.model';
import { Nivel } from './nivel.model';

export type Exercicio = {
  id: number;
  nome: string;
  descricao: string;
  enunciado: string;
  hash: string;
  tempo: number | null;
  qndt_erros: number;
  url: string;
  ativo: boolean;
  formula_id: number;
  nivel_id: number;
  recompensa_id: number | null;
  logic_live_id: number | null;
  created_at: string;
  updated_at: string;
  formula: Formula;
  nivel: Nivel;
};
