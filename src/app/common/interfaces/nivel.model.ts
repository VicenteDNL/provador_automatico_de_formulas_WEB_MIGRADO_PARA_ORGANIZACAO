/* eslint-disable @typescript-eslint/naming-convention */

export type Nivel = {
  id: number;
  recompensa_id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  logic_live_id: number;
  created_at: string | null;
  updated_at: string | null;
};
