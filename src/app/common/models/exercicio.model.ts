/* eslint-disable @typescript-eslint/naming-convention */

export type Exercicio = {

     id: number;
     nome: string;
     descricao: string;
     enunciado: string;
     hash: string;
     tempo: number|null;
     qndt_erros: number;
     url: string;
     ativo: boolean;
     id_formula: number;
     id_nivel: number;
     id_recompensa: number|null;
     id_logic_live: number|null;
     created_at: string;
     updated_at: string;


};
