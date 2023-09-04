import { Arvore } from '../interfaces/arvore/arvore.model';
import { Selecao } from './Selecao';

export class ArvoreManager {
  private arvore: Arvore;
  constructor() {
    this.arvore = {
      derivar: {
        passosExecutados: [],
        regras: [],
      },
      visualizar: {
        arestas: [],
        linhas: [],
        nos: [],
        height: 500,
        width: 500,
      },
      fechar: {
        passosExecutados: [],
        isAutomatico: false,
      },
      ticar: {
        passosExecutados: [],
        isAutomatico: false,
      },
      iniciar: {
        opcoesDisponiveis: [],
        passosExecutados: [],
        isCompleto: false,
      },
      formula: {
        texto: '',
        xml: '',
      },
      isCompleto: false,
    };
  }

  getArvore() {
    return this.arvore;
  }

  atualizarArvore(arvore: Arvore) {
    this.arvore = arvore;
  }

  inicializacaoIsCompleta() {
    return this.arvore.iniciar.isCompleto;
  }

  arvoreIsCompleta() {
    return this.arvore.isCompleto;
  }

  eventoMouseover(index: number) {
    this.arvore.visualizar.nos[index].fill = 'url(#grad2)';
  }

  eventoMouseleave(index: number) {
    this.arvore.visualizar.nos[index].fill = 'url(#grad1)';
  }

  eventoClickNo(index: number, selecao: Selecao) {
    const amarelos = selecao.getAmarelos();
    const vermelho = selecao.getVermelho();
    const desmarcadoNo = selecao.isDesmarcando();
    if (!this.arvore.iniciar.isCompleto) {
      return this.arvore;
    }

    // Seleção do no vermelho
    if (amarelos.length === 0 && vermelho === null && desmarcadoNo === false) {
      this.arvore.visualizar.nos[index].strokeColor = '#b91d1d';
      this.arvore.visualizar.nos[index].strokeWidth = 3;
      selecao.setVermelho(this.arvore.visualizar.nos[index]);
    }
    // Seleção  vermelho e amarelho no mesmo nó
    else if (
      amarelos.length === 0 &&
      vermelho === this.arvore.visualizar.nos[index] &&
      desmarcadoNo === false
    ) {
      this.arvore.visualizar.nos[index].strokeColor = 'url(#grad3)';
      this.arvore.visualizar.nos[index].strokeWidth = 3;
      selecao.addAmarelo(this.arvore.visualizar.nos[index]);
    }

    // Desmarcando um nó amarelo selecionado
    else if (
      amarelos.indexOf(this.arvore.visualizar.nos[index]) !== -1 &&
      vermelho === this.arvore.visualizar.nos[index] &&
      desmarcadoNo === false
    ) {
      this.arvore.visualizar.nos[index].strokeColor = '#b91d1d';
      this.arvore.visualizar.nos[index].strokeWidth = 3;

      selecao.setAmarelos(
        amarelos.splice(amarelos.indexOf(this.arvore.visualizar.nos[index]), 1),
      );
      selecao.setDesmarcando(true);
    }

    // Desmarcando um nó vermelho selecionado
    else if (
      amarelos.length === 0 &&
      vermelho === this.arvore.visualizar.nos[index] &&
      desmarcadoNo === true
    ) {
      this.arvore.visualizar.nos[index].strokeColor = '#C0C0C0';
      this.arvore.visualizar.nos[index].strokeWidth = 2;
      selecao.cleanVermelho();
      selecao.setDesmarcando(false);
    }

    // Marcando um segundo nó amarelho
    else if (
      vermelho !== this.arvore.visualizar.nos[index] &&
      amarelos.indexOf(this.arvore.visualizar.nos[index]) === -1
    ) {
      this.arvore.visualizar.nos[index].strokeColor = '#FFFF00';
      this.arvore.visualizar.nos[index].strokeWidth = 3;
      selecao.addAmarelo(this.arvore.visualizar.nos[index]);
    }

    // Desmarcando um nó amarelo selecionado
    else if (amarelos.indexOf(this.arvore.visualizar.nos[index]) !== -1) {
      this.arvore.visualizar.nos[index].strokeColor = '#C0C0C0';
      this.arvore.visualizar.nos[index].strokeWidth = 2;
      selecao.setAmarelos(
        amarelos.splice(amarelos.indexOf(this.arvore.visualizar.nos[index]), 1),
      );
    }

    selecao.habilitarBotoes();
    return selecao;
  }
}
