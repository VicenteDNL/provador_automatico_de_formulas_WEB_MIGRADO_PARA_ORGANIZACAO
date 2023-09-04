import { No } from '../interfaces/arvore/no.model.';

export class Selecao {
  private amarelos: No[];
  private vermelho: No | null;
  private desmarcadoNoInsercao: boolean;

  private botoesEnable = {
    fecharRamo: false,
    ticarNo: false,
    derivacao: false,
  };

  constructor() {
    this.amarelos = [];
    this.vermelho = null;
    this.desmarcadoNoInsercao = false;
  }

  getVermelho() {
    return this.vermelho;
  }

  setVermelho(no: No) {
    this.vermelho = no;
  }

  cleanVermelho() {
    this.vermelho = null;
  }

  getAmarelos() {
    return this.amarelos;
  }

  setAmarelos(nos: No[]) {
    this.amarelos = nos;
  }

  addAmarelo(no: No) {
    this.amarelos.push(no);
  }

  getFirstAmarelo() {
    return this.amarelos[0];
  }

  countAmarelos() {
    return this.amarelos.length;
  }

  isDesmarcando() {
    return this.desmarcadoNoInsercao;
  }

  setDesmarcando(desmarcado: boolean) {
    this.desmarcadoNoInsercao = desmarcado;
  }

  getBotoesEnable() {
    return this.botoesEnable;
  }

  restart() {
    this.amarelos = [];
    this.vermelho = null;
    this.desmarcadoNoInsercao = false;

    this.botoesEnable = {
      fecharRamo: false,
      ticarNo: false,
      derivacao: false,
    };
  }

  habilitarBotoes() {
    if (this.vermelho !== null && this.amarelos.length === 0) {
      this.botoesEnable.ticarNo = true;
      this.botoesEnable.derivacao = false;
      this.botoesEnable.fecharRamo = false;
    } else if (
      this.vermelho !== null &&
      this.amarelos.length > 0 &&
      this.amarelos.filter(n => this.vermelho === n).length > 0
    ) {
      this.botoesEnable.ticarNo = false;
      this.botoesEnable.derivacao = true;
      this.botoesEnable.fecharRamo = false;
    } else if (this.vermelho !== null && this.amarelos.length > 0) {
      this.botoesEnable.ticarNo = false;
      this.botoesEnable.derivacao = true;
      this.botoesEnable.fecharRamo = true;
    } else {
      this.botoesEnable.ticarNo = false;
      this.botoesEnable.derivacao = false;
      this.botoesEnable.fecharRamo = false;
    }
  }
}
