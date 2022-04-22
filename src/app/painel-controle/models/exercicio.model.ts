/* eslint-disable @typescript-eslint/naming-convention */
import { Recompensa } from './recompensa.model';
import { Formula } from './formula.model';
import { Niveis } from './niveis.model';

export type Exercicio = {

     id: string;
     id_logic_live: number;
     id_recompensa: Recompensa;
     id_nivel: Niveis;
     id_formula: Formula;
     nome: string;
     enunciado: string;
     descricao: string;
     hash: string;
     url: string;
     tempo: number |null;
     qndt_erros: number |null;
     ativo: number;
     created_at: Date;
     updated_at: Date;

};
