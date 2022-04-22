import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  faExclamationTriangle,
  faEye,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { MensagemConsole } from '../../../models/mensagemConsole';
import { Request } from '../../../models/request.model';
import { AlunoAuthService } from '../../../service/aluno-auth.service';
import { LivreService } from '../../../service/livre.service';
declare let gramLogic: any;

@Component({
  selector: 'app-estudo-livre',
  templateUrl: './estudo-livre.component.html',
  styleUrls: ['./estudo-livre.component.css'],
})
export class EstudoLivreComponent implements OnInit {

  duvida = faQuestionCircle;
  visual = faEye;
  erro = faExclamationTriangle;

  // Variaveis do CONSOLE
  msgConsole = new MensagemConsole();
  carregamentoConsole = false;
  request: Request ;
  formula = '';

  // Variaveis da etapa de INICIALIZACAO
  vermelho = null;
  amarelo = [];

  // Variaveis para controlar a ativação dos botoes
  ativosBtnFecharRamo = false;
  ativosBtnTicarNo = false;
  ativosCheckDerivacao = false;

  // outras variaveis de controle
  desmarcadonoInsercao = false;
  formulaInvalida = false;
  visualizararvore = false;
  mensagemError;
  respostaCorreta = true;
  derivacaoIniciada = false;
  modalInfoRef;
  modaErrorlRef;
  listaImpressaoNo;
  listaImpressaoAresta;
  modaArvoreRef;
  private readonly production = `${environment.production}`;
  constructor(
    private modalService: BsModalService,
    private service: LivreService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.request.strformula = 'Crie uma fórmula';
  }

  error(error) {
    this.carregamentoConsole = false;
    this.exibirNoConsole(error, 'error');
  }

  sucesso(response, tipo = '') {
    this.carregamentoConsole = false;
    if (response.success === true) {
      this.respostaCorreta = true;
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
      this.respostaCorreta = false;
    }
  }

  validarFormula() {
    if (this.request.xml === '') {
      this.request.xml = '';
      this.formulaInvalida = false;
      this.visualizararvore = true;
    } else {
      const validacao = gramLogic.validar(this.formula, this.production);
      if (validacao.sucesso === true) {
        this.formulaInvalida = false;
        this.visualizararvore = true;
        this.request.xml = validacao.xml;
      } else {
        this.formulaInvalida = true;
        this.visualizararvore = false;
        this.mensagemError = validacao.mensagem;
      }
    }
  }

  infoGramatica(template: TemplateRef<any>) {
    this.modalInfoRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }
  errorGramatica(template: TemplateRef<any>) {
    this.modaErrorlRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm' }),
    );
  }

  fecharModal() {
    this.modalInfoRef =
      this.modalInfoRef != null ? this.limparRefModal(this.modalInfoRef) : null;
    this.modaErrorlRef =
      this.modaErrorlRef != null
        ? this.limparRefModal(this.modaErrorlRef)
        : null;
    this.modaArvoreRef =
      this.modaArvoreRef != null
        ? this.limparRefModal(this.modaArvoreRef)
        : null;
  }

  limparRefModal(modal) {
    modal.hide();
    return null;
  }

  abrirArvore(template: TemplateRef<any>) {
    if (this.request.xml !== '') {
      this.service.arvoreOtimizada(this.request.xml).subscribe(
        response => {
          if (response.success) {
            this.listaImpressaoNo = response.data.nos;
            this.listaImpressaoAresta = response.data.arestas;
            this.modaArvoreRef = this.modalService.show(
              template,
              Object.assign({}, { class: 'modal-lg' }),
            );
          }
        },
        error => null,
      );
    }
  }

  iniciarDerivacao() {
    if (this.visualizararvore === true) {
      this.service.iniciar(this.request.xml).subscribe(response => {
        if (response.success) {
          this.request = response.data.arvore;
          this.exibirNoConsole('Exercício iniciado', 'sucesso');
          this.derivacaoIniciada = true;
        }
      });
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
    if (this.request.derivacao.regra === null) {
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
        this.vermelho === null &&
        this.desmarcadonoInsercao === false
      ) {
        this.request.nos[index].strokeColor = '#b91d1d';
        this.request.nos[index].strokeWidth = '3';
        this.vermelho = this.request.nos[index];

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
}
