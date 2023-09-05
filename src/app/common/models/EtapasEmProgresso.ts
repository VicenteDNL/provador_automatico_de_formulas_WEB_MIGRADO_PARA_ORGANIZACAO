import { Arvore } from '../interfaces/arvore/arvore.model';
import { ArvoreManager } from './ArvoreManager';

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

  atualizarEtapa(manager: ArvoreManager) {
    if (manager.arvoreIsCompleta()) {
      this.finalizar();
    } else if (manager.inicializacaoIsCompleta()) {
      this.startDerivacao();
    } else {
      this.startInicializacao();
    }
  }
}
