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
import { MensagemConsole } from 'src/app/exercicios/models/mensagemConsole';
import { Request } from 'src/app/exercicios/models/request.model';
import { ValidacaoService } from '../../../service/validacao.service';
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
  msgConsole = new MensagemConsole();
  carregamentoConsole = false;

  request: Request ;

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
  minutosRestante = 0;
  segundosRestante = 0;
  acabouRestante = false;
  interval;

  vida = null;
  enunciado = null;
  pontuacao = null;
  classTentativa;
  classPontuacao;
  classRiscoTempo;
  semrisco = { 'sem-risco': true, 'com-atenção': false, 'com-risco': false };
  comrisco = { 'sem-risco': false, 'com-atenção': false, 'com-risco': true };
  comatencao = { 'sem-risco': false, 'com-atenção': true, 'com-risco': false };
  selectContradicao = { 'select-contradicao': false };
  selectTautologia = { 'select-tautologia': false };
  respostaFinal;
  resultado = null;
  constructor(
    private service: ValidacaoService,
    private route: ActivatedRoute,
  ) {
    this.classPontuacao = {
      'sem-risco': true,
      'com-atenção': false,
      'com-risco': false,
    };

    this.classRiscoTempo = {
      'sem-risco': true,
      'com-atenção': false,
      'com-risco': false,
    };
    this.classTentativa = {
      'sem-risco': true,
      'com-atenção': false,
      'com-risco': false,
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.request.usu_hash = params.usu_hash;
      this.request.exe_hash = params.exe_hash;
      this.buscarExercicio(params);
    });
  }

  buscarExercicio(hash) {
    this.route.params.subscribe(params => {
      this.request.exercicio = params.id;
      this.service.buscarExercicios(this.request.exercicio, hash).subscribe(
        response => {
          if (response.success) {
            this.preparaExercicio(response.data);
          } else {
            // redirecionar pagina de erro
          }
        },
        error => {}, // redirecionar pagina de erro
      );
    });
  }

  preparaExercicio(data) {
    const exercicio = data.exercicio;
      const tentativas = data.tentativas;
    this.enunciado = exercicio.enunciado;

    // Cria o controle de tempo restante
    this.relogioTempoRestante(tentativas.tempo);
    this.vida = tentativas.erros;
    this.pontuacao = tentativas.pontuacao.ponto;
    // Verificar ticagem e fechamento automatico
    this.request = data.arvore;
    // ------
    this.exibirNoConsole('Exercício Inicializado', 'sucesso');

    const repeticao = data.tentativas.pontuacao.maximo;
      const tentativa = data.tentativas.erros;

    this.classTentativa =
      tentativa == null
        ? this.semrisco
        : tentativa > 3
        ? this.semrisco
        : tentativa <= 3 && tentativa > 1
        ? this.comatencao
        : this.comrisco;
    this.classPontuacao =
      this.pontuacao >= repeticao * 0.7
        ? this.semrisco
        : this.pontuacao >= repeticao * 0.5
        ? this.comatencao
        : this.pontuacao >= repeticao * 0.3
        ? this.comrisco
        : this.semrisco;
  }

  error(error) {
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
            this.request.fechar.folha.str +
            '\' realizado com sucesso';
          break;
        case 'ticar':
          msg = 'Nó \'' + this.request.ticar.no.str + '\' ticado com sucesso!';
          break;
        case 'derivar':
          msg =
            'Derivação do nó \'' +
            this.request.derivacao.no.str +
            '\' realizado com sucesso';
          break;
        case 'adicionar':
          msg = 'Argumento  \'' + this.request.inicio.no.str + '\' inserido';
          break;
        default:
          msg = '';
      }

      this.exibirNoConsole(msg, 'sucesso');
      this.ativosCheckDerivacao = false;
      this.ativosBtnFecharRamo = false;
      this.ativosBtnTicarNo = false;
      this.request = response.data;
      this.vermelho = null;
      this.amarelo = [];
    } else {
      this.exibirNoConsole(response.msg, 'error');
      this.vida = response.data.erros;
      this.pontuacao = response.data.pontuacao.ponto;
      const tentativa = response.data.erros;

      this.classTentativa =
        tentativa == null
          ? this.semrisco
          : tentativa > 3
          ? this.semrisco
          : tentativa <= 3 && tentativa > 1
          ? this.comatencao
          : this.comrisco;
    }
  }

  respostaExercicio(resp) {
    if (resp === 'T') {
      this.selectContradicao = { 'select-contradicao': false };
      this.selectTautologia = { 'select-tautologia': true };
      this.respostaFinal = 'TAUTOLOGIA';
    } else {
      this.selectContradicao = { 'select-contradicao': true };
      this.selectTautologia = { 'select-tautologia': false };
      this.respostaFinal = 'CONTRADICAO';
    }
  }

  validarResposta() {
    this.carregamentoConsole = true;
    this.exibirNoConsole('Validando resposta', 'info');
    this.request.resposta = this.respostaFinal;
    this.service.validarResposta(this.request).subscribe(
      response => {
        if (response.success) {
          this.resultado = true;
          this.carregamentoConsole = false;
          this.exibirNoConsole('Exercício finalizado', 'sucesso');
        } else {
          this.resultado = false;
          this.carregamentoConsole = false;
          this.exibirNoConsole('Resposta invalida', 'error');
          this.pontuacao = response.data.pontuacao.ponto;
        }
      },
      error => (this.resultado = null),
    );
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
  selecionado(id) {
    this.request.inicio.no = this.request.inicio.opcoes[id];
  }

  /**
   * ----------- Método 02 -----------
   * Descrição : adiciona a premissa ou conclusão na arvore
   */
  adicionaNo(negar) {
    this.request.inicio.negacao = negar === 1 ? true : false;
    this.carregamentoConsole = true;
    this.exibirNoConsole(
      'Inserindo o argumento  \'' + this.request.inicio.no.str + '\'',
      'info',
    );
    this.service.adicionarNo(this.request).subscribe(
      response => this.sucesso(response, 'adicionar'),
      error => this.error(error.message),
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
    this.request.derivacao.regra = regra;
    if (this.msgConsole.msg === 'Nenhuma regra selecionada') {
      this.msgConsole.msg = '';
    }
  }

  /**
   * ----------- Método 04 -----------
   * Descrição : Tica o nó de interesse
   */
  ticar() {
    this.request.ticar.no = this.vermelho;
    this.carregamentoConsole = true;
    this.exibirNoConsole(
      'Requisitando ticagem do nó  \'' + this.vermelho.str + '\'',
      'info',
    );
    this.service.ticarNo(this.request).subscribe(
      response => this.sucesso(response, 'ticar'),
      error => this.error(error.message),
    );
  }

  /**
   * ----------- Método 05 -----------
   * Descrição : Fechar o nó de interesse
   */
  fechar() {
    this.request.fechar.no = this.amarelo[0];
    this.request.fechar.folha = this.vermelho;
    this.carregamentoConsole = true;
    this.exibirNoConsole(
      'Requisitando fechamento do nó  \'' +
        this.request.fechar.folha.str +
        '\', contradição na linha:' +
        this.request.fechar.no.linha +
        '',
      'info',
    );
    this.service.fecharRamo(this.request).subscribe(
      response => this.sucesso(response, 'fechar'),
      error => this.error(error.message),
    );
  }

  /**
   * ----------- Método 06 -----------
   * Descrição : Realiza a derivação da arvore
   */
  derivar() {
    if (this.request.derivacao.regra == null) {
      this.exibirNoConsole('Nenhuma regra selecionada', 'error');
      return;
    }
    this.request.derivacao.no = this.vermelho;
    this.request.derivacao.folhas = this.amarelo;

    const listaIds = [];
      let nomes = '';

    this.request.derivacao.folhas.forEach((item) =>{
      listaIds.push(item.idNo);
      nomes = nomes + '[ ' + item.str + ', linha: ' + item.linha + ' ], ';
    });

    this.carregamentoConsole = true;
    this.exibirNoConsole(
      'Requisitando derivação do nó \'' +
        this.request.derivacao.no.str +
        '\' para inserção no no(s): ' +
        nomes,
      'info',
    );
    this.service.derivar(this.request).subscribe(
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
    this.request.nos[index].fill = 'url(#grad2)';
  }

  /**
   * ----------- Método 08 -----------
   * Descrição : Metodo aplicado para voltar a cor original do nó com o evento de hover-out do mouse
   */
  voltarcor(index) {
    this.request.nos[index].fill = 'url(#grad1)';
  }

  /**
   * ----------- Método 09 -----------
   * Descrição : Metodo aplicado para adicioanar os nós selecionados na arvore
   */

  selecionarNo(index) {
    if (this.request.inicio.completa === true) {
      // Seleção do no vermelho
      if (
        this.amarelo.length === 0 &&
        this.vermelho === null &&
        this.desmarcadonoInsercao === false
      ) {
        this.request.nos[index].strokeColor = '#b91d1d';
        this.request.nos[index].strokeWidth = '3';
        this.vermelho = this.request.nos[index];
        // this.request.derivacao.no=this.request.nos[index]

        this.ativosCheckDerivacao = false;
        this.ativosBtnFecharRamo = false;
        this.ativosBtnTicarNo = true;
      }
      // Seleção  vermelho e amarelho no mesmo nó
      else if (
        this.amarelo.length === 0 &&
        this.vermelho === this.request.nos[index] &&
        this.desmarcadonoInsercao === false
      ) {
        this.request.nos[index].strokeColor = 'url(#grad3)';
        this.request.nos[index].strokeWidth = '3';
        this.amarelo.push(this.request.nos[index]);

        this.ativosCheckDerivacao = true;
        this.ativosBtnFecharRamo = false;
        this.ativosBtnTicarNo = false;
      }

      // Desmarcando um nó amarelo selecionado
      else if (
        this.amarelo.indexOf(this.request.nos[index]) !== -1 &&
        this.vermelho === this.request.nos[index] &&
        this.desmarcadonoInsercao === false
      ) {
        this.request.nos[index].strokeColor = '#b91d1d';
        this.request.nos[index].strokeWidth = '3';
        this.amarelo.splice(this.amarelo.indexOf(this.request.nos[index]), 1);
        this.desmarcadonoInsercao = true;

        this.ativosCheckDerivacao = false;
        this.ativosBtnFecharRamo = false;
        this.ativosBtnTicarNo = true;
      }

      // Desmarcando um nó vermelho selecionado
      else if (
        this.amarelo.length === 0 &&
        this.vermelho === this.request.nos[index] &&
        this.desmarcadonoInsercao === true
      ) {
        this.request.nos[index].strokeColor = '#C0C0C0';
        this.request.nos[index].strokeWidth = '2';
        this.vermelho = null;
        this.desmarcadonoInsercao = false;

        this.ativosCheckDerivacao = false;
        this.ativosBtnFecharRamo = false;
        this.ativosBtnTicarNo = false;
      }

      // Marcando um segundo nó amarelho
      else if (
        this.vermelho !== this.request.nos[index] &&
        this.amarelo.indexOf(this.request.nos[index]) === -1
      ) {
        this.request.nos[index].strokeColor = '#FFFF00';
        this.request.nos[index].strokeWidth = '3';
        this.amarelo.push(this.request.nos[index]);

        this.ativosCheckDerivacao = true;
        this.ativosBtnFecharRamo = this.amarelo.length === 1 ? true : false;
        this.ativosBtnTicarNo = false;
      }

      // Desmarcando um nó amarelo selecionado
      else if (this.amarelo.indexOf(this.request.nos[index]) !== -1) {
        this.request.nos[index].strokeColor = '#C0C0C0';
        this.request.nos[index].strokeWidth = '2';
        this.amarelo.splice(this.amarelo.indexOf(this.request.nos[index]), 1);

        this.ativosCheckDerivacao = this.amarelo.length >= 1 ? true : false;
        this.ativosBtnFecharRamo = this.amarelo.length === 1 ? true : false;
        this.ativosBtnTicarNo = this.amarelo.length === 0 ? true : false;
      }
    }
  }

  exibirNoConsole(msg, tipo) {
    this.msgConsole = new MensagemConsole(msg, tipo);
  }

  relogioTempoRestante(tempo) {
    if (tempo.minutos === 0 && tempo.segundos === 0) {
      this.classRiscoTempo = {
        'sem-risco': false,
        'com-atenção': false,
        'com-risco': true,
      };
      this.acabouRestante = true;
      return;
    }

    this.minutosRestante = tempo.minutos;
    this.segundosRestante = tempo.segundos;

    if (this.minutosRestante != null) {
      this.interval = setInterval(() => {
        this.classRiscoTempo =
          this.minutosRestante === 0
            ? { 'sem-risco': false, 'com-atenção': false, 'com-risco': true }
            : this.minutosRestante < 3
            ? { 'sem-risco': false, 'com-atenção': true, 'com-risco': false }
            : { 'sem-risco': true, 'com-atenção': false, 'com-risco': false };
        if (this.segundosRestante > 0) {
          this.segundosRestante--;
        } else {
          if (this.minutosRestante <= 0) {
            this.acabouRestante = true;
          } else {
            this.segundosRestante = 59;
            this.minutosRestante--;
          }
        }
      }, 1000);
    }
  }

  tentarNovamente() {
    this.carregamentoConsole = true;
    this.service
      .tentarNovamente(
        this.request.exercicio,
        this.request.usu_hash,
        this.request.exe_hash,
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

  recomecar(response) {
    if (response.success) {
      const repeticao = response.data.tentativas.pontuacao.maximo;
        const tentativa = response.data.tentativas.erros;

      this.classTentativa =
        tentativa == null
          ? this.semrisco
          : tentativa > 3
          ? this.semrisco
          : tentativa <= 3 && tentativa > 1
          ? this.comatencao
          : this.comrisco;
      this.classPontuacao = this.classPontuacao =
        this.pontuacao >= repeticao * 0.7
          ? this.semrisco
          : this.pontuacao >= repeticao * 0.5
          ? this.comatencao
          : this.pontuacao >= repeticao * 0.3
          ? this.comrisco
          : this.semrisco;
      this.segundosRestante =
        response.data.tentativas.tempo.segundos;
      this.minutosRestante =
        response.data.tentativas.tempo.minutos;
      this.vida = response.data.tentativas.erros;
      this.pontuacao = response.data.tentativas.pontuacao.ponto;
      this.request = response.data.arvore;
      this.exibirNoConsole('Reiniciado!', 'sucesso');
      this.ativosCheckDerivacao = false;
      this.ativosBtnFecharRamo = false;
      this.ativosBtnTicarNo = false;
      this.vermelho = null;
      this.amarelo = [];
    } else {
      // redirecionar pagina de erro
    }
    this.carregamentoConsole = false;
  }
}
