import { Acoes } from '../enums/Acoes';
import { Logs } from '../enums/Logs';
import { No } from '../interfaces/arvore/no.model.';
import { OpcoesInicializacao } from '../interfaces/arvore/opcoesInicializacao.model';

export class Console {
  private isCarregando: boolean;
  private listaMsg: {
    msg: string;
    tipo: Logs;
  }[];

  constructor() {
    this.isCarregando = false;
    this.listaMsg = [];
  }

  addLog(msg: string, tipo: Logs, isCarregando: boolean) {
    this.listaMsg.unshift({ msg, tipo });
    this.isCarregando = isCarregando;
  }

  cleanLogs() {
    this.listaMsg = [];
    this.isCarregando = false;
  }

  lastLog() {
    return this.listaMsg[0] ?? null;
  }

  showLogs() {
    return this.listaMsg;
  }

  stopLoading() {
    this.isCarregando = false;
  }

  isLoading() {
    return this.isCarregando;
  }

  sucessoLogByAcao(
    acao: Acoes,
    no: No | null = null,
    op: OpcoesInicializacao | null = null,
  ) {
    let msg = '';
    switch (acao) {
      case Acoes.fechar:
        msg = `Fechamento do nó '${no.str}' realizado com sucesso`;
        break;
      case Acoes.ticar:
        msg = `Nó '${no.str}' ticado com sucesso`;
        break;
      case Acoes.derivar:
        msg = `Derivação do nó '${no.str}' realizado com sucesso`;
        break;
      case Acoes.adicionar:
        msg = `Argumento '${op.texto}' inserido`;
        break;
      case Acoes.iniciar:
        msg = `Árvore carregada`;
        break;
      default:
        msg = '';
    }
    this.addLog(msg, Logs.sucesso, false);
  }

  addLogByAcao(
    acao: Acoes,
    no: No | null = null,
    op: OpcoesInicializacao | null = null,
  ) {
    let msg = '';
    switch (acao) {
      case Acoes.fechar:
        msg = `Fechando o nó '${no.str}'`;
        break;
      case Acoes.ticar:
        msg = `Ticando nó '${no.str}'`;
        break;
      case Acoes.derivar:
        msg = `Derivando o nó '${no.str}`;
        break;
      case Acoes.adicionar:
        msg = `Inserindo o argumento '${op.texto}'`;
        break;
      case Acoes.iniciar:
        msg = `Árvore carregada`;
        break;
      default:
        msg = '';
    }
    this.addLog(msg, Logs.info, true);
  }
}
