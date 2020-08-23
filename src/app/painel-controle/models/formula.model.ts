import { Recompensa } from './recompensa.model';

export class Formula {

	constructor(
    public id?: string,
        public formula?: string,
        public quantidade_regras?:number,
        public ticar_automaticamente?: boolean,
        public fechar_automaticamente?: boolean,
        public iniciar_zerada?: boolean,
        public inicio_personalizado?: boolean,
        public lista_passos?: string,
        public created_at?: Date,
        public updated_at?: Date,
        ) {}
}
