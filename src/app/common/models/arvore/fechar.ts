import { No } from './no';

export type Fechar ={
    lista: {
        noContradicao: No;
        nofechado: No;
    }[];
    no: No;
    folha: No;
    auto: boolean;
};
