import { Recompensa } from './recompensa.model';

export class Formula {

	constructor(
    public id?: string,
        public formula?: string,
        public xml?: string,
        public quantidade_regras?:number,
        public ticar_automaticamente: boolean = false,
        public fechar_automaticamente: boolean = false,
        public iniciar_zerada: boolean = true,
        public inicio_personalizado: boolean= false,
        public lista_passos?: string,
        public created_at?: Date,
        public updated_at?: Date,
        ) {}
}
