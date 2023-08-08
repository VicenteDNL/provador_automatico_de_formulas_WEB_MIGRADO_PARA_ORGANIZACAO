/* eslint-disable @typescript-eslint/naming-convention */
import { Arestas } from './arestas.model';
import { Derivacao } from './derivacao.model';
import { Fechar } from './fechar.model.';
import { Inicio } from './inicio.model';
import { No } from './no.model.';
import { Regras } from './regras.model.';
import { Ticar } from './ticar.model';

export type Arvore = {
    strformula: string;
    nos: No[];
    arestas: Arestas[];
    inicio: Inicio;
    derivacao: Derivacao;
    fechar: Fechar;
    ticar: Ticar;
    regras: Regras[];
    finalizada: boolean;
    id_exercicio: number;
    exe_hash: string | null;
    usu_hash: string | null;
    resposta?: string;
    xml: string;
};

