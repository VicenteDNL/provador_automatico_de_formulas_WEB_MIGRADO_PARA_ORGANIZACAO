/* eslint-disable @typescript-eslint/naming-convention */
import { Recompensa } from './recompensa.model';

export type Niveis ={
     id: string;
     id_recompensa: Recompensa;
     nome: string;
     descricao: string;
     ativo: number;
     created_at: Date;
     updated_at: Date;

};
