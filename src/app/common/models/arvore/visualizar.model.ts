import { Aresta } from './aresta.model';
import { Linha } from './linha.model';
import { No } from './no.model.';

export type Visualizar ={
    nos: No[];
    arestas: Aresta[];
    linhas: Linha[];
    width: number;
    height: number;
};
