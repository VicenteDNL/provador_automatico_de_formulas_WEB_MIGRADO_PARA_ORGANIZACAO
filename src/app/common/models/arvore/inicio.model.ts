import { NoInicializacao } from './noInicializacao.model';

export type Inicio = {
    completa: boolean;
    lista:
        {
            idNo: string;
            negacao: boolean;
        } [];
    negacao: boolean | null;
    no: NoInicializacao;
    opcoes: NoInicializacao[];
};
