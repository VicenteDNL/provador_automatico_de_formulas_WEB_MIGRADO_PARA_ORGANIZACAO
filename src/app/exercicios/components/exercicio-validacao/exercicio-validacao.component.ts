/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercicio } from 'src/app/common/interfaces/exercicio.model';
import { Saude } from 'src/app/common/interfaces/saude';
import { ExercicioValidacaoResponse, HashInput } from './interfaces';
import { ExercicioValidacaoService } from './exercicio-validacao.service';
import { Console } from 'src/app/common/models/Console';
import { EtapasEmProgresso } from 'src/app/common/models/EtapasEmProgresso';
import { ArvoreManager } from 'src/app/common/models/ArvoreManager';
import { Selecao } from 'src/app/common/models/Selecao';
import { Passos } from 'src/app/common/models/Passos';
import { Acoes } from 'src/app/common/enums/Acoes';
import { Logs } from 'src/app/common/enums/Logs';
import { Resposta } from 'src/app/common/enums/Resposta';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { PassoFinalizar } from 'src/app/common/interfaces/passo/PassoFinalizar';
@Component({
  selector: 'app-exercicio-validacao',
  templateUrl: './exercicio-validacao.component.html',
  styleUrls: ['./exercicio-validacao.component.css'],
})
export class ExercicioValidacaoComponent implements OnInit {
  iconCheck = faCheckSquare;
  exercicio: Exercicio | null;
  reiniciandoExercicio = false;
  saude: Saude | null;
  resposta = {
    sucesso: null,
    classes: {
      contradicao: { 'select-contradicao': false },
      tautologia: { 'select-tautologia': false },
    },
  };
  validacaoTempo = {
    isFinalizado: false,
  };

  buscandoExercicio = true;
  hashInput: HashInput;
  console: Console = new Console();
  etapasEmProgresso: EtapasEmProgresso = new EtapasEmProgresso();
  arvoreManager: ArvoreManager = new ArvoreManager();
  selecao: Selecao = new Selecao();
  passos: Passos = new Passos();
  constructor(
    private service: ExercicioValidacaoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (
        queryParams.usu_hash === undefined ||
        queryParams.usu_hash === undefined
      ) {
        this.router.navigate(['exercicio/erro']);
      }
      this.hashInput = {
        usuHash: queryParams.usu_hash,
        exeHash: queryParams.exe_hash,
      };
      this.service.iniciar(this.hashInput).subscribe(
        response => {
          if (response.success) {
            this.sucessoNaRequisicao(response, Acoes.iniciar);
            this.exercicio = response.data.exercicio;
            this.inicializarRelogio();
          } else {
            this.router.navigate(['exercicio/erro']);
          }
          this.buscandoExercicio = false;
        },
        error => {
          this.router.navigate(['exercicio/erro']);
        },
      );
    });
  }

  adicionar(negar: boolean) {
    const inicializacao = this.passos.setInicializacao(negar);
    this.console.addLogByAcao(Acoes.adicionar, null, inicializacao.no);
    this.service
      .adicionar(this.arvoreManager.getArvore(), inicializacao, this.hashInput)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.adicionar),
        error => this.erroNaRequisicao(error),
      );
  }

  derivar() {
    const derivacao = this.passos.setDerivacao(this.selecao);
    this.console.addLogByAcao(Acoes.derivar, derivacao.noDerivacao);
    this.service
      .derivar(this.arvoreManager.getArvore(), derivacao, this.hashInput)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.derivar),
        error => this.erroNaRequisicao(error),
      );
  }

  ticar() {
    const ticagem = this.passos.setTicagem(this.selecao);
    this.console.addLogByAcao(Acoes.ticar, ticagem.no);
    this.service
      .ticar(this.arvoreManager.getArvore(), ticagem, this.hashInput)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.ticar),
        error => this.erroNaRequisicao(error),
      );
  }

  fechar() {
    const fechamento = this.passos.setFechamento(this.selecao);
    this.console.addLogByAcao(Acoes.fechar, fechamento.noFolha);
    this.service
      .fechar(this.arvoreManager.getArvore(), fechamento, this.hashInput)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.fechar),
        error => this.erroNaRequisicao(error),
      );
  }

  concluir(passo: PassoFinalizar) {
    this.console.addLog('Validando resposta', Logs.info, true);
    this.service
      .concluir(
        this.arvoreManager.getArvore(),
        this.passos.getFinalizar(),
        this.hashInput,
      )
      .subscribe(
        response => {
          if (response.success) {
            this.resposta.sucesso = true;
            this.console.addLog('Exercício finalizado', Logs.sucesso, false);
          } else {
            this.resposta.sucesso = false;
            this.console.addLog(
              'Resposta errada, tente novamente!',
              Logs.erro,
              false,
            );
          }
        },
        error => this.erroNaRequisicao(error),
      );
  }

  tentarNovamente() {
    this.reiniciandoExercicio = true;
    this.console.addLog('Recomençando exercicio', Logs.info, true);
    this.service.tentarNovamente(this.hashInput).subscribe(
      response => {
        this.reiniciandoExercicio = false;
        this.sucessoNaRequisicao(response, Acoes.iniciar);
        this.inicializarRelogio();
      },
      error => {
        this.reiniciandoExercicio = false;
        this.erroNaRequisicao(error);
      },
    );
  }

  sucessoNaRequisicao(response: ExercicioValidacaoResponse, acao: Acoes) {
    this.console.stopLoading();

    if (!response.success) {
      this.console.addLog(response.msg, Logs.erro, false);
      this.saude = response.data.saude;
      return;
    }
    this.console.sucessoLogByAcao(
      acao,
      this.passos.getFechamento().noFolha ??
        this.passos.getTicagem().no ??
        this.passos.getDerivacao().noDerivacao,
      this.passos.getInicializacao().no,
    );

    this.saude = response.data.saude;
    this.selecao.restart();
    this.passos.restart();
    this.arvoreManager.atualizarArvore(response.data.arvore);
    this.etapasEmProgresso.atualizarEtapa(this.arvoreManager);
  }

  erroNaRequisicao(erro: any) {
    this.console.addLog(
      erro?.error.msg ??
        'Ocorreu um erro ao inserir o argumento, tente novamente.',
      Logs.erro,
      false,
    );
  }

  inicializarRelogio() {
    if (this.saude.tempo == null) {
      this.validacaoTempo.isFinalizado = false;
      return;
    }

    if (this.saude.tempo.atual <= 0) {
      this.validacaoTempo.isFinalizado = true;
      return;
    }

    setInterval(() => {
      if (this.saude.tempo.atual > 0) {
        this.saude.tempo.atual--;
      } else {
        if (this.saude.tempo.atual <= 0) {
          this.validacaoTempo.isFinalizado = true;
        }
      }
    }, 1000);
  }
}
