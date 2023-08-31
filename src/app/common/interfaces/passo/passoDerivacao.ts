import { No } from '../arvore/no.model.';
import { Regra } from '../arvore/regra.model.';

export type PassoDerivacao ={
    nosInsercoes: No[]|null;
    noDerivacao: No|null;
    regra: Regra|null;
    desmarcadoNoInsercao: boolean;

};
