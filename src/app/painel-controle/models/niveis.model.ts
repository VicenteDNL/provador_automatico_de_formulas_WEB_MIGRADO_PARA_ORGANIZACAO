import { Recompensa } from './recompensa.model';

export class Niveis {

	constructor(
    public id?: string,
		public id_recompensa?: Recompensa,
        public nome?: string,
        public descricao?: string,
        public ativo?: boolean,
        public created_at?: Date,
        public updated_at?: Date,
        ) {}
}
