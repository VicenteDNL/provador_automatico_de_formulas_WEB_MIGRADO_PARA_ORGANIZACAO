/* eslint-disable @typescript-eslint/naming-convention */

import { Formula } from './formula.model';

export type Exercicio = {

     id: number;
     id_logic_live: number;
     id_recompensa: number;
     id_nivel: number;
     formula: Formula;
     nome: string;
     enunciado: string;
     descricao: string;
     hash: string;
     url: string;
     tempo: number |null;
     qndt_erros: number |null;
     ativo: boolean;
     created_at: Date;
     updated_at: Date;

};
