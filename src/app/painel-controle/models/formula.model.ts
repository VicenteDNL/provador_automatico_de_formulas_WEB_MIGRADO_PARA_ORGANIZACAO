/* eslint-disable @typescript-eslint/naming-convention */
import { Recompensa } from './recompensa.model';

export type Formula = {

     id?: string;
     formula?: string;
     xml?: string;
     quantidade_regras: number;
     ticar_automaticamente: boolean;
     fechar_automaticamente: boolean;
     iniciar_zerada: boolean;
     inicio_personalizado: boolean;
     inicializacao_completa: boolean;
     lista_passos?: any[];
     lista_derivacoes?: any[];
     lista_ticagem?: any[];
     lista_fechamento?: any[];
     created_at?: Date;
     updated_at?: Date;

};
