import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faExclamationTriangle,
  faEye,
  faQuestionCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ArvoreAutomatica } from 'src/app/common/interfaces/arvore/arvoreAutomatica';

import { Console } from 'src/app/common/models/Console';
import { ArvoreManager } from 'src/app/common/models/ArvoreManager';
import { Selecao } from 'src/app/common/models/Selecao';
import { Passos } from 'src/app/common/models/Passos';
import { EtapasEmProgresso } from 'src/app/common/models/EtapasEmProgresso';
import { Acoes } from 'src/app/common/enums/Acoes';
import { Logs } from 'src/app/common/enums/Logs';
import { Subject } from 'rxjs';
import { ArvoreService } from '../../common/services/arvore.service';
import { EstudoLivreService } from './estudo-livre.service';
import { ArvoreResponse, ConcluirEstudoLivreInput } from './interfaces';
import { Resposta } from 'src/app/common/enums/Resposta';
import { Formula } from 'src/app/common/models/Formula';
import { PassoFinalizar } from 'src/app/common/interfaces/passo/PassoFinalizar';

@Component({
  selector: 'app-estudo-livre',
  templateUrl: './estudo-livre.component.html',
  styleUrls: ['./estudo-livre.component.css'],
})
export class EstudoLivreComponent implements OnInit {
  iconFechar = faTimes;

  console: Console = new Console();
  etapasEmProgresso: EtapasEmProgresso = new EtapasEmProgresso();
  arvoreManager: ArvoreManager = new ArvoreManager();
  selecao: Selecao = new Selecao();
  passos: Passos = new Passos();
  formula: Formula = new Formula();

  concluirInput: ConcluirEstudoLivreInput | null = null;

  iniciandoEstudo = false;
  concluindoEstudo = false;

  globalErro = {
    msg: '',
    isAberto: false,
  };

  constructor(
    private service: EstudoLivreService,
    private router: Router,
    private serviceArvore: ArvoreService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (
        queryParams.usu_hash === undefined ||
        queryParams.usu_hash === undefined
      ) {
        this.router.navigate(['exercicio/erro']);
      }
      this.concluirInput = {
        usuHash: queryParams.usu_hash,
        exeHash: queryParams.exe_hash,
        arvore: this.arvoreManager.getArvore(),
      };
    });
  }

  adicionar(negar: boolean) {
    const inicializacao = this.passos.setInicializacao(negar);

    this.console.addLogByAcao(Acoes.adicionar, null, inicializacao.no);

    this.serviceArvore
      .adicionar(this.arvoreManager.getArvore(), inicializacao)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.adicionar),
        error => this.erroNaRequisicao(error),
      );
  }

  ticar() {
    const ticagem = this.passos.setTicagem(this.selecao);

    this.console.addLogByAcao(Acoes.ticar, ticagem.no);

    this.serviceArvore.ticar(this.arvoreManager.getArvore(), ticagem).subscribe(
      response => this.sucessoNaRequisicao(response, Acoes.ticar),
      error => this.erroNaRequisicao(error),
    );
  }

  fechar() {
    const fechamento = this.passos.setFechamento(this.selecao);

    this.console.addLogByAcao(Acoes.fechar, fechamento.noFolha);

    this.serviceArvore
      .fechar(this.arvoreManager.getArvore(), fechamento)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.fechar),
        error => this.erroNaRequisicao(error),
      );
  }

  derivar() {
    const derivacao = this.passos.setDerivacao(this.selecao);

    this.console.addLogByAcao(Acoes.derivar, derivacao.noDerivacao);

    this.serviceArvore
      .derivar(this.arvoreManager.getArvore(), derivacao)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.derivar),
        error => this.erroNaRequisicao(error),
      );
  }

  sucessoNaRequisicao(response: ArvoreResponse, acao: Acoes) {
    this.console.stopLoading();

    if (!response.success) {
      this.console.addLog(response.msg, Logs.erro, false);
      return;
    }
    this.console.sucessoLogByAcao(
      acao,
      this.passos.getFechamento().noFolha ??
        this.passos.getTicagem().no ??
        this.passos.getDerivacao().noDerivacao,
      this.passos.getInicializacao().no,
    );

    this.selecao.restart();
    this.passos.restart();
    this.arvoreManager.atualizarArvore(response.data);
    this.etapasEmProgresso.atualizarEtapa(this.arvoreManager);
  }

  erroNaRequisicao(erro: any) {
    this.console.cleanLogs();
    this.console.addLog(
      erro?.error.msg ??
        'Ocorreu um erro ao inserir o argumento, tente novamente.',
      Logs.erro,
      false,
    );
  }

  fecharAvisoError() {
    this.globalErro.msg = '';
    this.globalErro.isAberto = false;
  }
  abrirAvisoError(msg: string) {
    this.globalErro.msg = msg;
    this.globalErro.isAberto = true;

    setTimeout(() => {
      this.fecharAvisoError();
    }, 5000);
  }

  iniciarEstudo(formula: Formula) {
    this.formula = formula;
    this.console.addLog('Iniciando exercício', Logs.info, true);
    if (this.formula.isValida && this.formula.getXml() !== '') {
      this.serviceArvore.iniciar(this.formula.getXml()).subscribe(
        response => {
          if (response.success) {
            this.arvoreManager.atualizarArvore(response.data);
            this.etapasEmProgresso.startInicializacao();

            this.sucessoNaRequisicao(response, Acoes.iniciar);
          } else {
            this.abrirAvisoError(response.msg);
          }
          this.iniciandoEstudo = false;
        },
        erro => {
          this.abrirAvisoError('Ops! Ocorreu um erro ao inicar os estudos');
          this.iniciandoEstudo = false;
        },
      );
    }
  }

  concluir(passo: PassoFinalizar) {
    this.concluindoEstudo = true;
    this.concluirInput.arvore = this.arvoreManager.getArvore();
    this.service.concluir(this.concluirInput).subscribe(
      response => {
        if (response.success) {
          this.concluindoEstudo = false;
          this.console = new Console();
          this.etapasEmProgresso = new EtapasEmProgresso();
          this.arvoreManager = new ArvoreManager();
          this.selecao = new Selecao();
          this.passos = new Passos();
          this.formula = new Formula();
        } else {
          this.abrirAvisoError(response.msg);
        }
      },
      error => {
        this.abrirAvisoError('Ops! Ocorreu um erro ao inicar os estudos');
        this.concluindoEstudo = false;
      },
    );
  }
}
