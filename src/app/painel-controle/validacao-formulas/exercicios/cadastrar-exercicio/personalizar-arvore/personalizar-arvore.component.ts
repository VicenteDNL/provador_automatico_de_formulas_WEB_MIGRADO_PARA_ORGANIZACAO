import { Component, OnInit, Input } from '@angular/core';
import { ExerciciosService } from '../../exercicios.service';
import {
  faTimes,
  faTree,
  faPlus,
  faInfoCircle,
  faTrashAlt,
  faWindowMinimize,
  faMinusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { CadastrarExercicioComponent } from '../cadastrar-exercicio.component';
import { Mensagem } from 'src/app/painel-controle/models/mensagem.model';
import { Request } from 'src/app/painel-controle/models/request.model';
import { MensagemConsole } from 'src/app/painel-controle/models/mensagemConsole';
@Component({
  selector: 'app-personalizar-arvore',
  templateUrl: './personalizar-arvore.component.html',
  styleUrls: ['./personalizar-arvore.component.css'],
})
export class PersonalizarArvoreComponent implements OnInit {
  @Input() xmlFormula;
  @Input() refModal;

  // ICONES DO Font Awesome
  iconFechar = faTimes;
  arvore = faTree;
  add = faPlus;
  info = faInfoCircle;
  limpar = faTrashAlt;
  minimizar = faMinusSquare;
  // --------

  // Variaveis do CONSOLE
  listaconsole: Array<Mensagem> = [];
  isCollapsed = false;
  carregamentoConsole = false;
  // --------

  request: Request = new Request();

  vermelho = null;
  amarelo = [];
  // Variaveis para controlar a ativação dos botoes
  ativosBtnFecharRamo = false;
  ativosBtnTicarNo = false;
  ativosCheckDerivacao = false;
  // --------

  // outras variaveis de controle
  msgConsole = new MensagemConsole();
  errorMensagen;
  strFormula;
  desmarcadonoInsercao = false;

  // --------

  constructor(
    private service: ExerciciosService,
    private cadastrarCmp: CadastrarExercicioComponent,
  ) {}

  ngOnInit(): void {
    this.carregamentoConsole = true;
    this.exibirNoConsole('Buscando Fórmula', 'info');
    this.service.buscarInicioArvore(this.xmlFormula).subscribe(
      response => {
        this.sucesso(response);
      },
      error => {
        this.error(error.message);
      },
    );
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
      this.request.xml = this.xmlFormula;
      this.vermelho = null;
      this.amarelo = [];
    } else {
      this.exibirNoConsole(response.msg, 'error');
    }
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

    this.request.derivacao.folhas.forEach((item)=> {
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
        this.vermelho == null &&
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
    this.listaconsole.push(new Mensagem(msg, tipo));
  }

  limparConsole() {
    this.listaconsole = [];
  }

  fecharAvisoError() {
    this.errorMensagen = null;
  }

  finalizar() {
    this.cadastrarCmp.request = new Request();
    this.cadastrarCmp.exercicio.id_formula.inicio_personalizado = false;
    this.cadastrarCmp.exercicio.id_formula.iniciar_zerada = true;
    this.refModal.hide();
  }

  salvar() {
    this.cadastrarCmp.exercicio.id_formula.inicio_personalizado = true;
    this.cadastrarCmp.exercicio.id_formula.iniciar_zerada = false;
    this.refModal.hide();
    this.cadastrarCmp.request = this.request;
  }
}
