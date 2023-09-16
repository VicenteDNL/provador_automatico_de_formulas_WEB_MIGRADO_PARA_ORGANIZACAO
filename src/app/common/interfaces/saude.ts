export type Saude = {
  tentativas: {
    atual: number;
    inicial: number;
  } | null;
  pontuacao: {
    atual: number;
    inicial: number;
  } | null;
  tempo: {
    atual: number;
    inicial: number;
  } | null;
};
