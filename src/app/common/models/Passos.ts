import { OpcoesInicializacao } from '../interfaces/arvore/opcoesInicializacao.model';
import { Regra } from '../interfaces/arvore/regra.model.';
import { PassoDerivacao } from '../interfaces/passo/passoDerivacao';
import { PassoFechamento } from '../interfaces/passo/passoFechamento';
import { PassoInicializacao } from '../interfaces/passo/passoInicializacao';
import { PassoFinalizar } from '../interfaces/passo/PassoFinalizar';
import { PassoTicagem } from '../interfaces/passo/passoTicagem';
import { Selecao } from './Selecao';
import { Resposta } from '../enums/Resposta';

export class Passos {
  private inicializacao: PassoInicializacao;
  private derivacao: PassoDerivacao;
  private ticagem: PassoTicagem;
  private fechamento: PassoFechamento;
  private finalizar: PassoFinalizar;

  constructor() {
    this.restart();
  }

  restart() {
    this.inicializacao = {
      no: null,
      negacao: null,
    };

    this.derivacao = {
      noDerivacao: null,
      nosInsercoes: null,
      regra: null,
      desmarcadoNoInsercao: false,
    };

    this.ticagem = {
      no: null,
    };

    this.fechamento = {
      noContraditorio: null,
      noFolha: null,
    };

    this.finalizar = {
      resposta: null,
    };
  }

  getInicializacao() {
    return this.inicializacao;
  }

  setArgumentoInsercao(op: OpcoesInicializacao) {
    this.inicializacao.no = op;
  }

  setInicializacao(negar: boolean) {
    this.inicializacao.negacao = negar;
    return this.inicializacao;
  }

  getTicagem() {
    return this.ticagem;
  }

  setTicagem(selecao: Selecao) {
    this.ticagem.no = selecao.getVermelho();
    return this.ticagem;
  }

  getFechamento() {
    return this.fechamento;
  }

  setFechamento(selecao: Selecao) {
    // if (selecao.amarelos.length > 1) {
    //   return false;
    // }
    this.fechamento.noContraditorio = selecao.getFirstAmarelo();
    this.fechamento.noFolha = selecao.getVermelho();
    return this.fechamento;
  }

  getDerivacao() {
    return this.derivacao;
  }

  setRegraDerivacao(regra: Regra) {
    this.derivacao.regra = regra;
  }

  setDerivacao(selecao: Selecao) {
    // if (this.derivacao.regra === null) {
    //   return false;
    // }
    this.derivacao.noDerivacao = selecao.getVermelho();
    this.derivacao.nosInsercoes = selecao.getAmarelos();
    return this.derivacao;
  }

  setFinalizar(resposta: Resposta) {
    this.finalizar.resposta = resposta.valueOf();
  }
  getFinalizar() {
    return this.finalizar;
  }
}
