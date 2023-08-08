import { No } from './no.model.';

export type Fechar ={
    lista: {
        noContradicao: No;
        nofechado: No;
    }[];
    no: No;
    folha: No;
    auto: boolean;
};
