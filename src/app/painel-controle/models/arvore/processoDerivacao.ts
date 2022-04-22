/* eslint-disable @typescript-eslint/naming-convention */
import { Arestas } from './arestas';
import { Derivacao } from './derivacao';
import { Fechar } from './fechar';
import { Inicio } from './inicio';
import { No } from './nos';
import { Regras } from './regras';
import { Ticar } from './ticar';

export type ProcessoDerivacao = {
    exe_hash: string;
    usu_hash: string;
    exercicio: number;
    finalizada: boolean;
    strformula: string;
    xml: string;
    regras:  Regras[];
    arestas: Arestas[];
    nos: No[];
    derivacao: Derivacao;
    fechar: Fechar;
    inicio: Inicio;
    ticar: Ticar;

};
