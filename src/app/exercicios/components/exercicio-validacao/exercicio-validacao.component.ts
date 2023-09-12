/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faWindowClose,
  faCheckSquare,
  faTrashAlt,
  faCaretSquareUp,
  faCaretSquareDown,
  faHeart,
  faPlus,
  faInfinity,
  faClock,
  faTrophy,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { ValidacaoService } from '../../service/validacao.service';
import { Arvore } from 'src/app/common/interfaces/arvore/arvore.model';
import { Exercicio } from 'src/app/common/interfaces/exercicio.model';
import { Saude } from 'src/app/common/interfaces/saude';
import { Riscos } from 'src/app/common/interfaces/riscos.model';
import { ExercicioValidacaoResponse, HashInput } from './interfaces';
import { ExercicioValidacaoService } from './exercicio-validacao.service';
import { Console } from 'src/app/common/models/Console';
import { EtapasEmProgresso } from 'src/app/common/models/EtapasEmProgresso';
import { ArvoreManager } from 'src/app/common/models/ArvoreManager';
import { Selecao } from 'src/app/common/models/Selecao';
import { Passos } from 'src/app/common/models/Passos';
import { Acoes } from 'src/app/common/enums/Acoes';
import { ArvoreResponse } from '../../common/services/interfaces';
import { Logs } from 'src/app/common/enums/Logs';
import { Resposta } from 'src/app/common/enums/Resposta';
// import { ExercicioValidacaoResponse, HashExecicioInput } from 'src/app/exercicios/service/interfaces';
@Component({
  selector: 'app-exercicio-validacao',
  templateUrl: './exercicio-validacao.component.html',
  styleUrls: ['./exercicio-validacao.component.css'],
})
export class ExercicioValidacaoComponent implements OnInit {
  // close = faWindowClose;
  iconPlay = faPlay;
  iconCheck = faCheckSquare;
  // limpar = faTrashAlt;
  iconClock = faClock;
  // min = faCaretSquareUp;
  // max = faCaretSquareDown;
  iconHeart = faHeart;
  // plus = faPlus;
  // infinity = faInfinity;
  iconTrophy = faTrophy;

  // // Variaveis do CONSOLE
  // msgConsole: Mensagem = {msg:'',tipo:'sucesso'};
  // carregamentoConsole = false;

  // arvore: Arvore | null;

  // // Variaveis da etapa de INICIALIZACAO
  // vermelho = null;
  // amarelo = [];

  // // Variaveis para controlar a ativação dos botoes
  // ativosBtnFecharRamo = false;
  // ativosBtnTicarNo = false;
  // ativosCheckDerivacao = false;

  // // outras variaveis de controle
  // desmarcadonoInsercao = false;

  // // controle tempo
  // acabouRestante = false;

  classTentativa: Riscos = {
    semRisco: true,
    comAtencao: false,
    comRisco: false,
  };
  classPontuacao: Riscos = {
    semRisco: true,
    comAtencao: false,
    comRisco: false,
  };

  exercicio: Exercicio | null;
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
    classes: {
      semRisco: true,
      comAtencao: false,
      comRisco: false,
    },
  };

  buscandoExercicio = false;
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
        this.router.navigate(['exercicio/usuario-invalido']);
      }
      this.hashInput = {
        usuHash: queryParams.usu_hash,
        exeHash: queryParams.exe_hash,
      };
      this.buscandoExercicio = true;
      this.service.buscarExercicio(this.hashInput).subscribe(
        response => {
          if (response.success) {
            this.arvoreManager.atualizarArvore(response.data.arvore);
            this.exercicio = response.data.exercicio;
            this.saude = response.data.saude;
            this.iniciarExercicio();
          } else {
            // redirecionar pagina de erro
          }
          this.buscandoExercicio = false;
        },
        error => {
          // this.buscandoExercicio = false;
        }, // redirecionar pagina de erro
      );
    });
  }

  iniciarExercicio() {
    this.console.addLog('Boa sorte :)', Logs.sucesso, false);
    this.etapasEmProgresso.startInicializacao();
    this.inicializarRelogio();
  }

  adicionar(negar: boolean) {
    const inicializacao = this.passos.setInicializacao(negar);

    this.console.addLogByAcao(Acoes.adicionar, null, inicializacao.no);

    this.service
      .adicionar(this.arvoreManager.getArvore(), inicializacao)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.adicionar),
        error => this.erroNaRequisicao(error),
      );
  }

  derivar() {
    const derivacao = this.passos.setDerivacao(this.selecao);

    this.console.addLogByAcao(Acoes.derivar, derivacao.noDerivacao);

    this.service.derivar(this.arvoreManager.getArvore(), derivacao).subscribe(
      response => this.sucessoNaRequisicao(response, Acoes.derivar),
      error => this.erroNaRequisicao(error),
    );
  }

  ticar() {
    const ticagem = this.passos.setTicagem(this.selecao);

    this.console.addLogByAcao(Acoes.ticar, ticagem.no);

    this.service.ticar(this.arvoreManager.getArvore(), ticagem).subscribe(
      response => this.sucessoNaRequisicao(response, Acoes.ticar),
      error => this.erroNaRequisicao(error),
    );
  }

  fechar() {
    const fechamento = this.passos.setFechamento(this.selecao);

    this.console.addLogByAcao(Acoes.fechar, fechamento.noFolha);

    this.service.fechar(this.arvoreManager.getArvore(), fechamento).subscribe(
      response => this.sucessoNaRequisicao(response, Acoes.fechar),
      error => this.erroNaRequisicao(error),
    );
  }

  validarResposta() {
    this.console.addLog('Validando resposta', Logs.info, true);
    this.service
      .validar(this.arvoreManager.getArvore(), this.passos.getFinalizar())
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

  respostaExercicio(resp: string) {
    if (resp === 'TAUTOLOGIA') {
      this.resposta.classes.contradicao = { 'select-contradicao': false };
      this.resposta.classes.tautologia = { 'select-tautologia': true };
      this.passos.setFinalizar(Resposta.tautologia);
    } else if (resp === 'CONTRADICAO') {
      this.resposta.classes.contradicao = { 'select-contradicao': true };
      this.resposta.classes.tautologia = { 'select-tautologia': false };
      this.passos.setFinalizar(Resposta.contradicao);
    }
  }
  tentarNovamente() {
    this.console.addLog('Recomençando exercicio', Logs.info, true);
    //   this.service
    //     .tentarNovamente(
    //       this.arvore.id_exercicio,
    //       {
    //         usu_hash: this.arvore.usu_hash,
    //         exe_hash: this.arvore.exe_hash
    //       },
    //     )
    //     .subscribe(
    //       response => {
    //         this.recomecar(response);
    //       },
    //       error => {
    //         this.carregamentoConsole = false;
    //       },
    //     );
  }

  sucessoNaRequisicao(response: ExercicioValidacaoResponse, acao: Acoes) {
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
    this.arvoreManager.atualizarArvore(response.data.arvore);
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

  inicializarRelogio() {
    if (this.saude.tempo == null) {
      this.validacaoTempo.classes = {
        semRisco: true,
        comAtencao: false,
        comRisco: false,
      };
      this.validacaoTempo.isFinalizado = false;
      return;
    }

    if (this.saude.tempo.atual <= 0) {
      this.validacaoTempo.classes = {
        semRisco: false,
        comAtencao: false,
        comRisco: true,
      };
      this.validacaoTempo.isFinalizado = true;
      return;
    }

    setInterval(() => {
      this.validacaoTempo.classes =
        this.saude.tempo.atual === 0
          ? { semRisco: false, comAtencao: false, comRisco: true }
          : this.saude.tempo.atual < this.saude.tempo.inicial / 3
          ? { semRisco: false, comAtencao: true, comRisco: false }
          : { semRisco: true, comAtencao: false, comRisco: false };

      if (this.saude.tempo.atual > 0) {
        this.saude.tempo.atual--;
      } else {
        if (this.saude.tempo.atual <= 0) {
          this.validacaoTempo.isFinalizado = true;
        }
      }
    }, 1000);
  }

  // buscarExercicio(hash: HashExecicioInput) {
  //   this.route.params.subscribe(params => {
  //     this.service.buscarExercicio(params.id, hash).subscribe(
  //       response => this.preparaExercicio(response),
  //       error => {}, // redirecionar pagina de erro
  //     );
  //   });
  // }

  // preparaExercicio(response: ExercicioValidacaoResponse) {
  //   if (!response.success) {
  //     // redirecionar pagina de erro
  //   }
  //   const {data}= response;
  //   const {arvore, exercicio, tentativas}= data;
  //   this.arvore = arvore;
  //   this.exercicio = exercicio;
  //   this.tentativas = tentativas;
  //   this.inicializarRelogio();
  //   this.inicalizarClasses();
  //   this.exibirNoConsole('Exercício Inicializado', 'sucesso');
  // }

  // error(error: string) {
  //   this.exibirNoConsole(error, 'error');
  // }

  // sucesso(response, tipo = '') {
  //   this.carregamentoConsole = false;
  //   if (response.success === true) {
  //     let msg = '';
  //     switch (tipo) {
  //       case 'fechar':
  //         msg =
  //           'Fechamento do nó  \'' +
  //           this.arvore.fechar.folha.str +
  //           '\' realizado com sucesso';
  //         break;
  //       case 'ticar':
  //         msg = 'Nó \'' + this.arvore.ticar.no.str + '\' ticado com sucesso!';
  //         break;
  //       case 'derivar':
  //         msg =
  //           'Derivação do nó \'' +
  //           this.arvore.derivacao.no.str +
  //           '\' realizado com sucesso';
  //         break;
  //       case 'adicionar':
  //         msg = 'Argumento  \'' + this.arvore.inicio.no.str + '\' inserido';
  //         break;
  //       default:
  //         msg = '';
  //     }

  //     this.exibirNoConsole(msg, 'sucesso');
  //     this.ativosCheckDerivacao = false;
  //     this.ativosBtnFecharRamo = false;
  //     this.ativosBtnTicarNo = false;
  //     this.arvore = response.data;
  //     this.vermelho = null;
  //     this.amarelo = [];
  //   } else {
  //     this.exibirNoConsole(response.msg, 'error');
  //     this.tentativas.erros = response.data.erros;
  //     this.tentativas.pontuacao.ponto  = response.data.pontuacao.ponto;
  //   }
  // }

  // exibirNoConsole(msg: string, tipo: string) {
  //   this.msgConsole ={msg,tipo} ;
  // }

  // inicalizarClasses() {
  //   const semrisco = { semRisco: true, comAtencao: false, comRisco: false };
  //   const comrisco = { semRisco: false, comAtencao: false, comRisco: true };
  //   const comatencao = { semRisco: false, comAtencao: true, comRisco: false };
  //   const vida = this.tentativas.erros;
  //   this.classTentativa =
  //     this.tentativas == null
  //       ? semrisco
  //       : vida > 3
  //       ? semrisco
  //       : vida <= 3 && vida > 1
  //       ? comatencao
  //       : comrisco;

  //   const pontuacao = this.tentativas.pontuacao.ponto;
  //   const repeticao = this.tentativas.pontuacao.maximo;
  //   this.classPontuacao =
  //     pontuacao >= repeticao * 0.7
  //       ? semrisco
  //       : pontuacao >= repeticao * 0.5
  //       ? comatencao
  //       : pontuacao >= repeticao * 0.3
  //       ? comrisco
  //       : semrisco;
  // }

  // recomecar(response: ExercicioValidacaoResponse) {
  //   if (!response.success) {
  //     // redirecionar pagina de erro
  //   }
  //   const {data}= response;
  //   const {arvore, exercicio, tentativas}= data;
  //   this.arvore = arvore;
  //   this.exercicio = exercicio;
  //   this.tentativas = tentativas;
  //   this.inicalizarClasses();
  //   this.inicializarRelogio();
  //   this.exibirNoConsole('Reiniciado!', 'sucesso');
  //   this.ativosCheckDerivacao = false;
  //   this.ativosBtnFecharRamo = false;
  //   this.ativosBtnTicarNo = false;
  //   this.vermelho = null;
  //   this.amarelo = [];
  //   this.carregamentoConsole = false;
  // }

  // /**
  //  * ----------- Metodos da etapa de Inicialização -----------
  //  *
  //  * Descrição :
  //  * 		 Os métodos de 1 a 2 são responsavel pelo controle
  //  * 		 de inserção de todas as premissas e conclução na árvore de
  //  *       derivação
  //  *
  //  */

  // /**
  //  * ----------- Método 01 -----------
  //  * Descrição : Pega o valor do check box selecionado e adiciona a variavel
  //  */
  // selecionado(id: number) {
  //   this.arvore.inicio.no = this.arvore.inicio.opcoes[id];
  // }

  // /**
  //  * ----------- Método 02 -----------
  //  * Descrição : adiciona a premissa ou conclusão na arvore
  //  */
  // adicionaNo(negar: number) {
  //   this.arvore.inicio.negacao = negar === 1 ? true : false;
  //   this.carregamentoConsole = true;
  //   this.exibirNoConsole(
  //     'Inserindo o argumento  \'' + this.arvore.inicio.no.str + '\'',
  //     'info',
  //   );
  //   this.service.adicionarNo(this.arvore).subscribe(
  //     response => this.sucesso(response, 'adicionar'),
  //     error => { console.log(error.message);this.error(error.message);},
  //   );
  // }

  // /**
  //  * ----------- Metodos da etapa de Derivavao  -----------
  //  *
  //  * Descrição :
  //  * 		 Os métodos de 3 a 6 são responsavel pelo controle
  //  * 		 de derivação dos nós da
  //  *
  //  */

  // /**
  //  * ----------- Método 03 -----------
  //  * Descrição : Adiciona a regra escolhida
  //  */
  // regra(regra) {
  //   this.arvore.derivacao.regra = regra;
  //   if (this.msgConsole.msg === 'Nenhuma regra selecionada') {
  //     this.msgConsole.msg = '';
  //   }
  // }

  // /**
  //  * ----------- Método 04 -----------
  //  * Descrição : Tica o nó de interesse
  //  */
  // ticar() {
  //   this.arvore.ticar.no = this.vermelho;
  //   this.carregamentoConsole = true;
  //   this.exibirNoConsole(
  //     'Requisitando ticagem do nó  \'' + this.vermelho.str + '\'',
  //     'info',
  //   );
  //   this.service.ticarNo(this.arvore).subscribe(
  //     response => this.sucesso(response, 'ticar'),
  //     error => this.error(error.message),
  //   );
  // }

  // /**
  //  * ----------- Método 05 -----------
  //  * Descrição : Fechar o nó de interesse
  //  */
  // fechar() {
  //   this.arvore.fechar.no = this.amarelo[0];
  //   this.arvore.fechar.folha = this.vermelho;
  //   this.carregamentoConsole = true;
  //   this.exibirNoConsole(
  //     'Requisitando fechamento do nó  \'' +
  //       this.arvore.fechar.folha.str +
  //       '\', contradição na linha:' +
  //       this.arvore.fechar.no.linha +
  //       '',
  //     'info',
  //   );
  //   this.service.fecharRamo(this.arvore).subscribe(
  //     response => this.sucesso(response, 'fechar'),
  //     error => this.error(error.message),
  //   );
  // }

  // /**
  //  * ----------- Método 06 -----------
  //  * Descrição : Realiza a derivação da arvore
  //  */
  // derivar() {
  //   if (this.arvore.derivacao.regra == null) {
  //     this.exibirNoConsole('Nenhuma regra selecionada', 'error');
  //     return;
  //   }
  //   this.arvore.derivacao.no = this.vermelho;
  //   this.arvore.derivacao.folhas = this.amarelo;

  //   const listaIds = [];
  //     let nomes = '';

  //   this.arvore.derivacao.folhas.forEach((item) =>{
  //     listaIds.push(item.idNo);
  //     nomes = nomes + '[ ' + item.str + ', linha: ' + item.linha + ' ], ';
  //   });

  //   this.carregamentoConsole = true;
  //   this.exibirNoConsole(
  //     'Requisitando derivação do nó \'' +
  //       this.arvore.derivacao.no.str +
  //       '\' para inserção no no(s): ' +
  //       nomes,
  //     'info',
  //   );
  //   this.service.derivar(this.arvore).subscribe(
  //     response => this.sucesso(response, 'derivar'),
  //     error => this.error(error.message),
  //   );
  // }

  // /**
  //  * ----------- Metodos para controlar a selecção dos nós -----------
  //  *
  //  * Descrição :
  //  * 		 Os métodos de 7 a 9 são responsavel pelo controle
  //  * 		 controlar o evento de selecção dos nos da arvore, e
  //  * 		 aplicar os estilos para os nós selecionados
  //  *
  //  */

  // /**
  //  * ----------- Método 07 -----------
  //  * Descrição : Metodo aplicado para alterar cor do nó com o evento de hover-in do mouse
  //  */
  // alterarcor(index) {
  //   this.arvore.nos[index].fill = 'url(#grad2)';
  // }

  // /**
  //  * ----------- Método 08 -----------
  //  * Descrição : Metodo aplicado para voltar a cor original do nó com o evento de hover-out do mouse
  //  */
  // voltarcor(index) {
  //   this.arvore.nos[index].fill = 'url(#grad1)';
  // }

  // /**
  //  * ----------- Método 09 -----------
  //  * Descrição : Metodo aplicado para adicioanar os nós selecionados na arvore
  //  */

  // selecionarNo(index) {
  //   if (this.arvore.inicio.completa === true) {
  //     // Seleção do no vermelho
  //     if (
  //       this.amarelo.length === 0 &&
  //       this.vermelho === null &&
  //       this.desmarcadonoInsercao === false
  //     ) {
  //       this.arvore.nos[index].strokeColor = '#b91d1d';
  //       this.arvore.nos[index].strokeWidth = 3;
  //       this.vermelho = this.arvore.nos[index];
  //       // this.request.derivacao.no=this.request.nos[index]

  //       this.ativosCheckDerivacao = false;
  //       this.ativosBtnFecharRamo = false;
  //       this.ativosBtnTicarNo = true;
  //     }
  //     // Seleção  vermelho e amarelho no mesmo nó
  //     else if (
  //       this.amarelo.length === 0 &&
  //       this.vermelho === this.arvore.nos[index] &&
  //       this.desmarcadonoInsercao === false
  //     ) {
  //       this.arvore.nos[index].strokeColor = 'url(#grad3)';
  //       this.arvore.nos[index].strokeWidth = 3;
  //       this.amarelo.push(this.arvore.nos[index]);

  //       this.ativosCheckDerivacao = true;
  //       this.ativosBtnFecharRamo = false;
  //       this.ativosBtnTicarNo = false;
  //     }

  //     // Desmarcando um nó amarelo selecionado
  //     else if (
  //       this.amarelo.indexOf(this.arvore.nos[index]) !== -1 &&
  //       this.vermelho === this.arvore.nos[index] &&
  //       this.desmarcadonoInsercao === false
  //     ) {
  //       this.arvore.nos[index].strokeColor = '#b91d1d';
  //       this.arvore.nos[index].strokeWidth = 3;
  //       this.amarelo.splice(this.amarelo.indexOf(this.arvore.nos[index]), 1);
  //       this.desmarcadonoInsercao = true;

  //       this.ativosCheckDerivacao = false;
  //       this.ativosBtnFecharRamo = false;
  //       this.ativosBtnTicarNo = true;
  //     }

  //     // Desmarcando um nó vermelho selecionado
  //     else if (
  //       this.amarelo.length === 0 &&
  //       this.vermelho === this.arvore.nos[index] &&
  //       this.desmarcadonoInsercao === true
  //     ) {
  //       this.arvore.nos[index].strokeColor = '#C0C0C0';
  //       this.arvore.nos[index].strokeWidth = 2;
  //       this.vermelho = null;
  //       this.desmarcadonoInsercao = false;

  //       this.ativosCheckDerivacao = false;
  //       this.ativosBtnFecharRamo = false;
  //       this.ativosBtnTicarNo = false;
  //     }

  //     // Marcando um segundo nó amarelho
  //     else if (
  //       this.vermelho !== this.arvore.nos[index] &&
  //       this.amarelo.indexOf(this.arvore.nos[index]) === -1
  //     ) {
  //       this.arvore.nos[index].strokeColor = '#FFFF00';
  //       this.arvore.nos[index].strokeWidth = 3;
  //       this.amarelo.push(this.arvore.nos[index]);

  //       this.ativosCheckDerivacao = true;
  //       this.ativosBtnFecharRamo = this.amarelo.length === 1 ? true : false;
  //       this.ativosBtnTicarNo = false;
  //     }

  //     // Desmarcando um nó amarelo selecionado
  //     else if (this.amarelo.indexOf(this.arvore.nos[index]) !== -1) {
  //       this.arvore.nos[index].strokeColor = '#C0C0C0';
  //       this.arvore.nos[index].strokeWidth = 2;
  //       this.amarelo.splice(this.amarelo.indexOf(this.arvore.nos[index]), 1);

  //       this.ativosCheckDerivacao = this.amarelo.length >= 1 ? true : false;
  //       this.ativosBtnFecharRamo = this.amarelo.length === 1 ? true : false;
  //       this.ativosBtnTicarNo = this.amarelo.length === 0 ? true : false;
  //     }
  //   }
  // }
}
