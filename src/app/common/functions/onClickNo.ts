import { Arvore } from '../models/arvore/arvore.model';
import { No } from '../models/arvore/no.model.';

export type Selecao = {
    amarelos: No[];
    vermelho: No;
    desmarcadoNoInsercao: boolean;
};

export const onClickNo = (index: number,arvore: Arvore,selecao: Selecao) =>{

    if (!arvore.iniciar.isCompleto) {
      return {arvore,selecao};
    }

    // Seleção do no vermelho
    if (
      selecao.amarelos.length === 0 &&
      selecao.vermelho === null &&
      selecao.desmarcadoNoInsercao === false
    ) {


      arvore.visualizar.nos[index].strokeColor = '#b91d1d';
      arvore.visualizar.nos[index].strokeWidth = 3;
      selecao.vermelho = arvore.visualizar.nos[index];
    }
    // Seleção  vermelho e amarelho no mesmo nó
    else if (
      selecao.amarelos.length === 0 &&
      selecao.vermelho === arvore.visualizar.nos[index] &&
      selecao.desmarcadoNoInsercao === false
    ) {
      arvore.visualizar.nos[index].strokeColor = 'url(#grad3)';
      arvore.visualizar.nos[index].strokeWidth = 3;
      selecao.amarelos.push(arvore.visualizar.nos[index]);
    }

    // Desmarcando um nó amarelo selecionado
    else if (
      selecao.amarelos.indexOf(arvore.visualizar.nos[index]) !== -1 &&
      selecao.vermelho === arvore.visualizar.nos[index] &&
      selecao.desmarcadoNoInsercao === false
    ) {
      arvore.visualizar.nos[index].strokeColor = '#b91d1d';
      arvore.visualizar.nos[index].strokeWidth = 3;
      selecao.amarelos.splice(selecao.amarelos.indexOf(arvore.visualizar.nos[index]), 1);
      selecao.desmarcadoNoInsercao = true;
    }

    // Desmarcando um nó vermelho selecionado
    else if (
      selecao.amarelos.length === 0 &&
      selecao.vermelho === arvore.visualizar.nos[index] &&
      selecao.desmarcadoNoInsercao === true
    ) {
      arvore.visualizar.nos[index].strokeColor = '#C0C0C0';
      arvore.visualizar.nos[index].strokeWidth = 2;
      selecao.vermelho = null;
      selecao.desmarcadoNoInsercao = false;
    }

    // Marcando um segundo nó amarelho
    else if (
      selecao.vermelho !== arvore.visualizar.nos[index] &&
      selecao.amarelos.indexOf(arvore.visualizar.nos[index]) === -1
    ) {
      arvore.visualizar.nos[index].strokeColor = '#FFFF00';
      arvore.visualizar.nos[index].strokeWidth = 3;
      selecao.amarelos.push(arvore.visualizar.nos[index]);
    }

    // Desmarcando um nó amarelo selecionado
    else if (selecao.amarelos.indexOf(arvore.visualizar.nos[index]) !== -1) {
      arvore.visualizar.nos[index].strokeColor = '#C0C0C0';
      arvore.visualizar.nos[index].strokeWidth = 2;
      selecao.amarelos.splice(selecao.amarelos.indexOf(arvore.visualizar.nos[index]), 1);

    }

    return {arvore,selecao};

  };
