import { No } from './no.model.';
import { Regra } from './regra.model.';

export type Derivar ={
    passosExecutados: {
            insercao: number[];
            derivacao: number;
            regra: number;
        }[];
    regras: Regra[];
};
