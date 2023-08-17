import { No } from './no.model.';

export type Fechar ={
    passosExecutados: {
        noContradicao: No;
        nofechado: No;
    }[];
    isAutomatico: boolean;
};
