/* eslint-disable @typescript-eslint/naming-convention */
import { Derivar } from './derivar.model';
import { Fechar } from './fechar.model.';
import { Formula } from './formula.model';
import { Iniciar } from './iniciar.model';
import { Ticar } from './ticar.model';
import { Visualizar } from './visualizar.model';

export type Arvore = {
    visualizar: Visualizar;
    derivar: Derivar;
    iniciar: Iniciar;
    fechar: Fechar;
    ticar: Ticar;
    formula: Formula;
    isCompleto: boolean;
};

