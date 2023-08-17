import { OpcoesInicializacao } from './opcoesInicializacao.model';

export type Iniciar = {
    isCompleto: boolean;
    passosExecutados:
        {
            idNo: string;
            negacao: boolean;
        } [];
    opcoesDisponiveis: OpcoesInicializacao[];
};
