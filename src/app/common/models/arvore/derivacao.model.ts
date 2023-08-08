import { No } from './no.model.';

export type Derivacao ={
    lista: {
            insercao: No[];
            derivacao: number;
            regra: number;
        }[];
    folhas: No[];
    no: No | null;
    regra: number | null;
};
