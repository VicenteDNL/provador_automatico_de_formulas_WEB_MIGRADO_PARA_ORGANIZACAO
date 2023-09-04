export class EtapasEmProgresso {
  private etapaInicializacao: boolean;
  private etapaDerivacao: boolean;

  constructor() {
    this.restart();
  }

  restart() {
    this.etapaInicializacao = false;
    this.etapaDerivacao = false;
  }

  finalizar() {
    this.etapaInicializacao = false;
    this.etapaDerivacao = false;
  }

  startInicializacao() {
    this.etapaInicializacao = true;
    this.etapaDerivacao = false;
  }
  startDerivacao() {
    this.etapaInicializacao = false;
    this.etapaDerivacao = true;
  }

  derivacao() {
    return this.etapaDerivacao;
  }

  inicializacao() {
    return this.etapaInicializacao;
  }
}
