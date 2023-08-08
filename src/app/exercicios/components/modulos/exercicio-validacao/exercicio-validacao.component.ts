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
} from '@fortawesome/free-solid-svg-icons';
import { ValidacaoService } from '../../../service/validacao.service';
import { Arvore } from 'src/app/common/models/arvore/arvore.model';
import { Exercicio } from 'src/app/common/models/exercicio.model';
import { Tentativas } from 'src/app/common/models/tentativas.model';
import { Riscos } from 'src/app/common/models/riscos.model';
import { Mensagem } from 'src/app/common/models/mensagem.model';
import { ExercicioValidacaoResponse, HashExecicioInput } from 'src/app/exercicios/service/interfaces';
@Component({
  selector: 'app-exercicio-validacao',
  templateUrl: './exercicio-validacao.component.html',
  styleUrls: ['./exercicio-validacao.component.css'],
})
export class ExercicioValidacaoComponent implements OnInit {
  close = faWindowClose;
  check = faCheckSquare;
  limpar = faTrashAlt;
  clock = faClock;
  min = faCaretSquareUp;
  max = faCaretSquareDown;
  heart = faHeart;
  plus = faPlus;
  infinity = faInfinity;
  trophy = faTrophy;

  // Variaveis do CONSOLE
  msgConsole: Mensagem = {msg:'',tipo:'sucesso'};
  carregamentoConsole = false;

  arvore: Arvore | null;
  exercicio: Exercicio|null;
  tentativas: Tentativas |null;

  // Variaveis da etapa de INICIALIZACAO
  vermelho = null;
  amarelo = [];

  // Variaveis para controlar a ativação dos botoes
  ativosBtnFecharRamo = false;
  ativosBtnTicarNo = false;
  ativosCheckDerivacao = false;

  // outras variaveis de controle
  desmarcadonoInsercao = false;

  // controle tempo
  acabouRestante = false;
  interval;

  classTentativa: Riscos = {semRisco: true, comAtencao: false,comRisco: false};
  classPontuacao: Riscos = {semRisco: true, comAtencao: false,comRisco: false};
  classRiscoTempo: Riscos = {semRisco: true, comAtencao: false,comRisco: false};

  selectContradicao = { 'select-contradicao': false };
  selectTautologia = { 'select-tautologia': false };
  resultado = null;
  constructor(
    private service: ValidacaoService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const hash: HashExecicioInput = {usu_hash:params.usu_hash || '',exe_hash:params.exe_hash || ''};
      this.buscarExercicio(hash);
    });
  }

  buscarExercicio(hash: HashExecicioInput) {
    this.route.params.subscribe(params => {
      this.service.buscarExercicio(params.id, hash).subscribe(
        response => this.preparaExercicio(response),
        error => {}, // redirecionar pagina de erro
      );
    });
  }

  preparaExercicio(response: ExercicioValidacaoResponse) {

    if (!response.success) {
      // redirecionar pagina de erro
    }

    const {data}= response;
    const {arvore, exercicio, tentativas}= data;
    this.arvore = arvore;
    this.exercicio = exercicio;
    this.tentativas = tentativas;
    this.inicializarRelogio();
    this.inicalizarClasses();
    this.exibirNoConsole('Exercício Inicializado', 'sucesso');
  }

  error(error: string) {
    this.exibirNoConsole(error, 'error');
  }

  sucesso(response, tipo = '') {
    this.carregamentoConsole = false;
    if (response.success === true) {
      let msg = '';
      switch (tipo) {
        case 'fechar':
          msg =
            'Fechamento do nó  \'' +
            this.arvore.fechar.folha.str +
            '\' realizado com sucesso';
          break;
        case 'ticar':
          msg = 'Nó \'' + this.arvore.ticar.no.str + '\' ticado com sucesso!';
          break;
        case 'derivar':
          msg =
            'Derivação do nó \'' +
            this.arvore.derivacao.no.str +
            '\' realizado com sucesso';
          break;
        case 'adicionar':
          msg = 'Argumento  \'' + this.arvore.inicio.no.str + '\' inserido';
          break;
        default:
          msg = '';
      }

      this.exibirNoConsole(msg, 'sucesso');
      this.ativosCheckDerivacao = false;
      this.ativosBtnFecharRamo = false;
      this.ativosBtnTicarNo = false;
      this.arvore = response.data;
      this.vermelho = null;
      this.amarelo = [];
    } else {
      this.exibirNoConsole(response.msg, 'error');
      this.tentativas.erros = response.data.erros;
      this.tentativas.pontuacao.ponto  = response.data.pontuacao.ponto;
    }
  }

  respostaExercicio(resp: string) {
    if (resp === 'T') {
      this.selectContradicao = { 'select-contradicao': false };
      this.selectTautologia = { 'select-tautologia': true };
      this.arvore.resposta = 'TAUTOLOGIA';
    } else {
      this.selectContradicao = { 'select-contradicao': true };
      this.selectTautologia = { 'select-tautologia': false };
      this.arvore.resposta = 'CONTRADICAO';
    }
  }

  validarResposta() {
    this.carregamentoConsole = true;
    this.exibirNoConsole('Validando resposta', 'info');
    this.service.validarResposta(this.arvore).subscribe(
      response => {
        if (response.success) {
          this.resultado = true;
          this.carregamentoConsole = false;
          this.exibirNoConsole('Exercício finalizado', 'sucesso');
        } else {
          this.resultado = false;
          this.carregamentoConsole = false;
          this.exibirNoConsole('Resposta invalida', 'error');
          this.tentativas = response.data;
        }
      },
      error => (this.resultado = null),
    );
  }

  exibirNoConsole(msg: string, tipo: string) {
    this.msgConsole ={msg,tipo} ;
  }

  inicializarRelogio() {
    if (this.tentativas.tempo.minutos === 0 && this.tentativas.tempo.segundos === 0) {
      this.classRiscoTempo = {
        semRisco: false,
        comAtencao: false,
        comRisco: true,
      };
      this.acabouRestante = true;
      return;
    }

    if (this.tentativas.tempo.minutos != null) {
      this.interval = setInterval(() => {
        this.classRiscoTempo =
          this.tentativas.tempo.minutos === 0
            ? { semRisco: false, comAtencao: false, comRisco: true }
            : this.tentativas.tempo.minutos < 3
            ? { semRisco: false, comAtencao: true, comRisco: false }
            : { semRisco: true, comAtencao: false, comRisco: false };
        if (this.tentativas.tempo.segundos > 0) {
          this.tentativas.tempo.segundos--;
        } else {
          if (this.tentativas.tempo.minutos <= 0) {
            this.acabouRestante = true;
          } else {
            this.tentativas.tempo.segundos = 59;
            this.tentativas.tempo.minutos--;
          }
        }
      }, 1000);
    }
  }

  inicalizarClasses(){

    const semrisco = { semRisco: true, comAtencao: false, comRisco: false };
    const comrisco = { semRisco: false, comAtencao: false, comRisco: true };
    const comatencao = { semRisco: false, comAtencao: true, comRisco: false };
    const vida = this.tentativas.erros;
    this.classTentativa =
      this.tentativas == null
        ? semrisco
        : vida > 3
        ? semrisco
        : vida <= 3 && vida > 1
        ? comatencao
        : comrisco;

    const pontuacao =this.tentativas.pontuacao.ponto;
    const repeticao =this.tentativas.pontuacao.maximo;
    this.classPontuacao =
    pontuacao >= repeticao * 0.7
        ? semrisco
        : pontuacao >= repeticao * 0.5
        ? comatencao
        : pontuacao >= repeticao * 0.3
        ? comrisco
        : semrisco;
  }

  tentarNovamente() {
    this.carregamentoConsole = true;
    this.service
      .tentarNovamente(
        this.arvore.id_exercicio,
        {
          usu_hash: this.arvore.usu_hash,
          exe_hash: this.arvore.exe_hash
        },
      )
      .subscribe(
        response => {
          this.recomecar(response);
        },
        error => {
          this.carregamentoConsole = false;
        },
      );
  }

  recomecar(response: ExercicioValidacaoResponse) {
    if (!response.success) {
      // redirecionar pagina de erro
    }
    const {data}= response;
    const {arvore, exercicio, tentativas}= data;
    this.arvore = arvore;
    this.exercicio = exercicio;
    this.tentativas = tentativas;
    this.inicalizarClasses();
    this.inicializarRelogio();
    this.exibirNoConsole('Reiniciado!', 'sucesso');
    this.ativosCheckDerivacao = false;
    this.ativosBtnFecharRamo = false;
    this.ativosBtnTicarNo = false;
    this.vermelho = null;
    this.amarelo = [];
    this.carregamentoConsole = false;
  }

  /**
   * ----------- Metodos da etapa de Inicialização -----------
   *
   * Descrição :
   * 		 Os métodos de 1 a 2 são responsavel pelo controle
   * 		 de inserção de todas as premissas e conclução na árvore de
   *       derivação
   *
   */

  /**
   * ----------- Método 01 -----------
   * Descrição : Pega o valor do check box selecionado e adiciona a variavel
   */
  selecionado(id: number) {
    this.arvore.inicio.no = this.arvore.inicio.opcoes[id];
  }

  /**
   * ----------- Método 02 -----------
   * Descrição : adiciona a premissa ou conclusão na arvore
   */
  adicionaNo(negar: number) {
    this.arvore.inicio.negacao = negar === 1 ? true : false;
    this.carregamentoConsole = true;
    this.exibirNoConsole(
      'Inserindo o argumento  \'' + this.arvore.inicio.no.str + '\'',
      'info',
    );
    this.service.adicionarNo(this.arvore).subscribe(
      response => this.sucesso(response, 'adicionar'),
      error => { console.log(error.message);this.error(error.message);},
    );
  }

  /**
   * ----------- Metodos da etapa de Derivavao  -----------
   *
   * Descrição :
   * 		 Os métodos de 3 a 6 são responsavel pelo controle
   * 		 de derivação dos nós da
   *
   */

  /**
   * ----------- Método 03 -----------
   * Descrição : Adiciona a regra escolhida
   */
  regra(regra) {
    this.arvore.derivacao.regra = regra;
    if (this.msgConsole.msg === 'Nenhuma regra selecionada') {
      this.msgConsole.msg = '';
    }
  }

  /**
   * ----------- Método 04 -----------
   * Descrição : Tica o nó de interesse
   */
  ticar() {
    this.arvore.ticar.no = this.vermelho;
    this.carregamentoConsole = true;
    this.exibirNoConsole(
      'Requisitando ticagem do nó  \'' + this.vermelho.str + '\'',
      'info',
    );
    this.service.ticarNo(this.arvore).subscribe(
      response => this.sucesso(response, 'ticar'),
      error => this.error(error.message),
    );
  }

  /**
   * ----------- Método 05 -----------
   * Descrição : Fechar o nó de interesse
   */
  fechar() {
    this.arvore.fechar.no = this.amarelo[0];
    this.arvore.fechar.folha = this.vermelho;
    this.carregamentoConsole = true;
    this.exibirNoConsole(
      'Requisitando fechamento do nó  \'' +
        this.arvore.fechar.folha.str +
        '\', contradição na linha:' +
        this.arvore.fechar.no.linha +
        '',
      'info',
    );
    this.service.fecharRamo(this.arvore).subscribe(
      response => this.sucesso(response, 'fechar'),
      error => this.error(error.message),
    );
  }

  /**
   * ----------- Método 06 -----------
   * Descrição : Realiza a derivação da arvore
   */
  derivar() {
    if (this.arvore.derivacao.regra == null) {
      this.exibirNoConsole('Nenhuma regra selecionada', 'error');
      return;
    }
    this.arvore.derivacao.no = this.vermelho;
    this.arvore.derivacao.folhas = this.amarelo;

    const listaIds = [];
      let nomes = '';

    this.arvore.derivacao.folhas.forEach((item) =>{
      listaIds.push(item.idNo);
      nomes = nomes + '[ ' + item.str + ', linha: ' + item.linha + ' ], ';
    });

    this.carregamentoConsole = true;
    this.exibirNoConsole(
      'Requisitando derivação do nó \'' +
        this.arvore.derivacao.no.str +
        '\' para inserção no no(s): ' +
        nomes,
      'info',
    );
    this.service.derivar(this.arvore).subscribe(
      response => this.sucesso(response, 'derivar'),
      error => this.error(error.message),
    );
  }

  /**
   * ----------- Metodos para controlar a selecção dos nós -----------
   *
   * Descrição :
   * 		 Os métodos de 7 a 9 são responsavel pelo controle
   * 		 controlar o evento de selecção dos nos da arvore, e
   * 		 aplicar os estilos para os nós selecionados
   *
   */

  /**
   * ----------- Método 07 -----------
   * Descrição : Metodo aplicado para alterar cor do nó com o evento de hover-in do mouse
   */
  alterarcor(index) {
    this.arvore.nos[index].fill = 'url(#grad2)';
  }

  /**
   * ----------- Método 08 -----------
   * Descrição : Metodo aplicado para voltar a cor original do nó com o evento de hover-out do mouse
   */
  voltarcor(index) {
    this.arvore.nos[index].fill = 'url(#grad1)';
  }

  /**
   * ----------- Método 09 -----------
   * Descrição : Metodo aplicado para adicioanar os nós selecionados na arvore
   */

  selecionarNo(index) {
    if (this.arvore.inicio.completa === true) {
      // Seleção do no vermelho
      if (
        this.amarelo.length === 0 &&
        this.vermelho === null &&
        this.desmarcadonoInsercao === false
      ) {
        this.arvore.nos[index].strokeColor = '#b91d1d';
        this.arvore.nos[index].strokeWidth = 3;
        this.vermelho = this.arvore.nos[index];
        // this.request.derivacao.no=this.request.nos[index]

        this.ativosCheckDerivacao = false;
        this.ativosBtnFecharRamo = false;
        this.ativosBtnTicarNo = true;
      }
      // Seleção  vermelho e amarelho no mesmo nó
      else if (
        this.amarelo.length === 0 &&
        this.vermelho === this.arvore.nos[index] &&
        this.desmarcadonoInsercao === false
      ) {
        this.arvore.nos[index].strokeColor = 'url(#grad3)';
        this.arvore.nos[index].strokeWidth = 3;
        this.amarelo.push(this.arvore.nos[index]);

        this.ativosCheckDerivacao = true;
        this.ativosBtnFecharRamo = false;
        this.ativosBtnTicarNo = false;
      }

      // Desmarcando um nó amarelo selecionado
      else if (
        this.amarelo.indexOf(this.arvore.nos[index]) !== -1 &&
        this.vermelho === this.arvore.nos[index] &&
        this.desmarcadonoInsercao === false
      ) {
        this.arvore.nos[index].strokeColor = '#b91d1d';
        this.arvore.nos[index].strokeWidth = 3;
        this.amarelo.splice(this.amarelo.indexOf(this.arvore.nos[index]), 1);
        this.desmarcadonoInsercao = true;

        this.ativosCheckDerivacao = false;
        this.ativosBtnFecharRamo = false;
        this.ativosBtnTicarNo = true;
      }

      // Desmarcando um nó vermelho selecionado
      else if (
        this.amarelo.length === 0 &&
        this.vermelho === this.arvore.nos[index] &&
        this.desmarcadonoInsercao === true
      ) {
        this.arvore.nos[index].strokeColor = '#C0C0C0';
        this.arvore.nos[index].strokeWidth = 2;
        this.vermelho = null;
        this.desmarcadonoInsercao = false;

        this.ativosCheckDerivacao = false;
        this.ativosBtnFecharRamo = false;
        this.ativosBtnTicarNo = false;
      }

      // Marcando um segundo nó amarelho
      else if (
        this.vermelho !== this.arvore.nos[index] &&
        this.amarelo.indexOf(this.arvore.nos[index]) === -1
      ) {
        this.arvore.nos[index].strokeColor = '#FFFF00';
        this.arvore.nos[index].strokeWidth = 3;
        this.amarelo.push(this.arvore.nos[index]);

        this.ativosCheckDerivacao = true;
        this.ativosBtnFecharRamo = this.amarelo.length === 1 ? true : false;
        this.ativosBtnTicarNo = false;
      }

      // Desmarcando um nó amarelo selecionado
      else if (this.amarelo.indexOf(this.arvore.nos[index]) !== -1) {
        this.arvore.nos[index].strokeColor = '#C0C0C0';
        this.arvore.nos[index].strokeWidth = 2;
        this.amarelo.splice(this.amarelo.indexOf(this.arvore.nos[index]), 1);

        this.ativosCheckDerivacao = this.amarelo.length >= 1 ? true : false;
        this.ativosBtnFecharRamo = this.amarelo.length === 1 ? true : false;
        this.ativosBtnTicarNo = this.amarelo.length === 0 ? true : false;
      }
    }
  }
}
