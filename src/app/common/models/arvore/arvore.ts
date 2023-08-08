/* eslint-disable @typescript-eslint/naming-convention */
import { Arestas } from './arestas';
import { Derivacao } from './derivacao';
import { Fechar } from './fechar';
import { Inicio } from './inicio';
import { No } from './no';
import { Regras } from './regras';
import { Ticar } from './ticar';

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

