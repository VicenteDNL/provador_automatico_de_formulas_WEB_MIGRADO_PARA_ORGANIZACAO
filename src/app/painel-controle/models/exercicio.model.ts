import { Recompensa } from './recompensa.model';
import { Formula } from './formula.model';
import { Niveis } from './niveis.model';

export class Exercicio {

	constructor(
    public id?: string,
        public id_recompensa?: Recompensa,
        public id_nivel?: Niveis,
        public id_formula?: Formula,
        public nome?: string,
        public enunciado?: string,
        public descricao?: string,
        public hash?: string,
        public url?: string,
        public tempo?: number,
        public ativo: boolean=true,
        public created_at?: Date,
        public updated_at?: Date,
        ) {}
}
