import { environment } from 'src/environments/environment';

declare let gramLogic: any;
export class Formula {
  private readonly production = `${environment.production}`;
  private texto: string | null;
  private xml: string | null;
  private valida: boolean;
  private loading: boolean;
  private mensagemErro: string | null;

  constructor() {
    this.restart();
  }

  restart() {
    this.valida = false;
    this.loading = false;
    this.texto = null;
    this.xml = null;
    this.mensagemErro = null;
  }
  getTexto() {
    return this.texto;
  }

  getXml() {
    return this.xml;
  }
  getErro() {
    return this.mensagemErro;
  }

  isValida() {
    return this.valida;
  }
  isLoading() {
    return this.loading;
  }

  validar(formula: string) {
    if (formula) {
      const validacao = gramLogic.validar(formula, this.production);

      this.valida = validacao.sucesso;
      this.xml = validacao.sucesso ? validacao.xml : null;
      this.mensagemErro = validacao.sucesso ? null : validacao.mensagem;
      this.texto = validacao.sucesso ? formula : null;
      return validacao.sucesso;
    }
    this.texto = null;
    this.xml = null;
    this.valida = false;
    return false;
  }
}
