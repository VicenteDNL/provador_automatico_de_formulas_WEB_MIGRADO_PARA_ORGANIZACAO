import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  faExclamationTriangle,
  faEye,
  faQuestionCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { LivreService } from '../../../service/livre.service';
import { Arvore } from 'src/app/common/models/arvore/arvore.model';
import { ArvoreAutomatica } from 'src/app/common/models/arvore/arvoreAutomatica';
import { PassoInicializacao } from 'src/app/common/models/passo/passoInicializacao';
import { ArvoreResponse } from 'src/app/exercicios/service/interfaces';
import { Selecao, onClickNo } from 'src/app/common/functions/onClickNo';
import { OpcoesInicializacao } from 'src/app/common/models/arvore/opcoesInicializacao.model';
import { PassoDerivacao } from 'src/app/common/models/passo/passoDerivacao';
import { PassoTicagem } from 'src/app/common/models/passo/passoTicagem';
import { PassoFechamento } from 'src/app/common/models/passo/passoFechamento';
import { Regra } from 'src/app/common/models/arvore/regra.model.';
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
  iconFechar = faTimes;

  console = {
    msg:  '',
    tipo: 'sucesso',
    isCarregando: false,
  };

  arvoreAutomatica: ArvoreAutomatica ={
    formula:{texto:'',xml:''},
    visualizar:{
      arestas:[],
      nos:[],
      linhas:[],
      height:0,
      width:0
    }
  };

  arvore: Arvore ={
    visualizar:{
      arestas:[],
      nos:[],
      linhas:[],
      height:0,
      width:0
    },
    iniciar:{
      isCompleto:false,
      opcoesDisponiveis:[],
      passosExecutados:[]
    },
    derivar:{
      passosExecutados:[],
      regras:[]
    },
    fechar:{
      passosExecutados:[],
      isAutomatico:false
    },
    ticar:{
      passosExecutados:[],
      isAutomatico:false
    },
    formula:{
      xml:'',
      texto:''
    },
    isCompleto:false
  } ;

  nosSelecionados: Selecao ={
    amarelos:[],
    vermelho:null,
    desmarcadoNoInsercao:false
  };

  botoesEnable = {
  fecharRamo : false,
  ticarNo : false,
  derivacao : false
  };

  formula ={
    texto:'',
    isValida:false,
    mensagemErro: ''
  };

  etapasEmProgresso = {
    inicializacao:false,
    derivacao:false
  };

  passosInicializacao: PassoInicializacao ={
    no:null,
    negacao:null
  };

  passoDerivacao: PassoDerivacao ={
    noDerivacao:null,
    nosInsercoes:null,
    regra:null,
    desmarcadoNoInsercao:false
  };

  passoTicagem: PassoTicagem ={
    no:null
  };

  passoFechamento: PassoFechamento = {
    noContraditorio:null,
    noFolha:null
  };

  modalRef: BsModalRef;

  spinners = {
    iniciandoEstudo:false,
    criandoArvoreOtimizada:false
  };

  globalErro ={
    msg:'',
    isAberto:false
  };
  private readonly production = `${environment.production}`;
  constructor(
    private modalService: BsModalService,
    private service: LivreService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.arvore.formula.texto = 'Crie uma fórmula';
  }

  cleanConsole() {
    this.exibirNoConsole('', 'info',false);
  }

  sucesso(response: ArvoreResponse, tipo: string ) {
    this.console.isCarregando = false;
    if (response.success) {
      let msg = '';
      switch (tipo) {
        case 'fechar':
          msg =
          `Fechamento do nó '${this.passoFechamento.noFolha.str}' realizado com sucesso`;
          this.passoFechamento.noFolha =null;
          this.passoFechamento.noContraditorio=null;
          break;
        case 'ticar':
          msg = `Nó '${this.passoTicagem.no.str}' ticado com sucesso`;
          this.passoTicagem.no=null;
          break;
        case 'derivar':
          msg =
          `Derivação do nó '${this.passoDerivacao.noDerivacao.str}' realizado com sucesso`;
          this.passoDerivacao.noDerivacao=null;
          this.passoDerivacao.nosInsercoes=null;
          this.passoDerivacao.regra=null;
          break;
        case 'adicionar':
          msg = `Argumento '${this.passosInicializacao.no.texto}' inserido`;
          this.passosInicializacao.no=null;
          this.passosInicializacao.negacao=null;
          break;
        default:
          msg = '';
      }

      this.arvore =response.data;
      if(this.arvore.iniciar.isCompleto){
        this.etapasEmProgresso.inicializacao=false;
        this.etapasEmProgresso.derivacao=true;
      }
      this.exibirNoConsole(msg, 'sucesso',false);

      this.botoesEnable = {
        fecharRamo : false,
        ticarNo : false,
        derivacao : false
        };

      this.nosSelecionados ={
        amarelos:[],
        vermelho:null,
        desmarcadoNoInsercao:false
      };

      if(this.arvore.isCompleto){
        this.etapasEmProgresso.derivacao=false;
        this.etapasEmProgresso.inicializacao=false;
      }
    } else {
      this.exibirNoConsole(response.msg, 'error',false);
    }
  }

  validarFormula() {
    if (this.formula.texto === '') {
      this.arvore.formula.xml = '';
      this.formula.isValida = false;
      this.formula.mensagemErro='';
    } else {
      const validacao = gramLogic.validar(this.formula.texto, this.production);
      if (validacao.sucesso === true) {
        this.formula.isValida = true;
        this.arvore.formula.xml = validacao.xml;
        this.formula.mensagemErro='';
      } else {
        this.formula.isValida = false;
        this.formula.mensagemErro = validacao.mensagem;
      }
    }
  }

  abirModal(template: TemplateRef<any>, nome: string){

    switch(nome){
      case 'gramatica':
        this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' }),
        );
        break;
      case 'erroFormula':
        this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'modal-sm' }),
        );
        break;
      case 'arvore':
        if (this.arvore.formula.xml !== '') {
          this.spinners.criandoArvoreOtimizada=true;
          this.service.arvoreOtimizada(this.arvore.formula.xml).subscribe(
            response => {
              if (response.success) {
                this.arvoreAutomatica = response.data;
                this.modalRef = this.modalService.show(
                  template,
                  Object.assign({}, { class: 'modal-lg' }),
                );
              }else{
                this.abrirAvisoError(response.msg);
              }
              this.spinners.criandoArvoreOtimizada=false;
            },
            error => {
              this.abrirAvisoError('Ops! Ocorreu um erro ao gerar a árvore');
              this.spinners.criandoArvoreOtimizada=false;
            }
          );
        }
        break;
    }
  }

  fecharAvisoError() {
    this.globalErro.msg='';
    this.globalErro.isAberto=false;
  }

  abrirAvisoError(msg: string) {
    this.globalErro.msg=msg;
    this.globalErro.isAberto=true;

    setTimeout(() => {
      this.fecharAvisoError();
    },5000);
}

  fecharModal() {
    this.modalRef.hide();
    return null;
  }

  iniciarEstudo() {
    this.spinners.iniciandoEstudo=true;
    if (this.formula.isValida && this.arvore.formula.xml !=='') {
      this.service.iniciar(this.arvore.formula.xml).subscribe(
        response => {
          if (response.success) {
            this.arvore = response.data;
            this.etapasEmProgresso.inicializacao=true;
            this.exibirNoConsole('Adicione as premissas e conclução na árvore', 'sucesso',false);

          }else{
            this.abrirAvisoError(response.msg);
          }
          this.spinners.iniciandoEstudo=false;
        },
        erro =>{
          this.abrirAvisoError('Ops! Ocorreu um erro ao inicar os estudos');
          this.spinners.iniciandoEstudo=false;
        }
      );
    }
  }

  reiniciarEstudo(){

  }

  seleciona(op: OpcoesInicializacao) {

    this.passosInicializacao.no = op;
  }

  adicionaPremissaConclucao(negar: boolean) {
   this.passosInicializacao.negacao=negar;
    this.exibirNoConsole(
      `Inserindo o argumento '${this.passosInicializacao.no.texto}'`,
      'info',
      true
    );

    this.service.adicionar(this.arvore,this.passosInicializacao).subscribe(
      response => this.sucesso(response, 'adicionar'),
      error => {
        this.cleanConsole();
        this.abrirAvisoError('Ops! Ocorreu um erro ao inserir o argumento, tente novamente.');
      }
    );
  }

  regra(regra: Regra) {
    this.passoDerivacao.regra = regra;
  }

  ticar() {
    this.passoTicagem.no = this.nosSelecionados.vermelho;

    this.exibirNoConsole(
      `Ticando nó '${this.nosSelecionados.vermelho.str}'`,
      'info',
      true
    );
    this.service.ticar(this.arvore,this.passoTicagem).subscribe(
      response => this.sucesso(response, 'ticar'),
      error => {
        this.cleanConsole();
        this.abrirAvisoError('Ops! Ocorreu um erro ao ticar o argumento, tente novamente.');
      },
    );
  }

  fechar() {

    if(this.nosSelecionados.amarelos.length>1){
      this.exibirNoConsole('Mais de um nó folha selecionado', 'error', false);
    }
    this.passoFechamento.noContraditorio = this.nosSelecionados.amarelos[0];
    this.passoFechamento.noFolha = this.nosSelecionados.vermelho;

    this.exibirNoConsole(
      `Fechando o nó '${this.passoFechamento.noFolha.str}', contradição na linha:'${this.passoFechamento.noContraditorio.linha}'`,
      'info',
      false
    );

    this.service.fechar(this.arvore,this.passoFechamento).subscribe(
      response => this.sucesso(response, 'fechar'),
      error =>{
        this.cleanConsole();
        this.abrirAvisoError('Ops! Ocorreu um erro ao derivar o argumento, tente novamente.');
      },
    );
  }

  derivar() {
    if (this.passoDerivacao.regra === null) {
      this.exibirNoConsole('Nenhuma regra selecionada', 'error', false);
      return;
    }

    this.passoDerivacao.noDerivacao =this.nosSelecionados.vermelho;
    this.passoDerivacao.nosInsercoes =this.nosSelecionados.amarelos;

    this.exibirNoConsole(
      `Derivando o nó '${this.passoDerivacao.noDerivacao.str}`,
      'info',
      true
    );

    this.service.derivar(this.arvore,this.passoDerivacao).subscribe(
      response => this.sucesso(response, 'derivar'),
      error =>{
        this.cleanConsole();
        this.abrirAvisoError('Ops! Ocorreu um erro ao derivar o argumento, tente novamente.');
      },
    );
  }

  exibirNoConsole(msg: string, tipo: string,isCarregando: boolean) {
    this.console = {msg,tipo,isCarregando};
  }

  eventoMouseover(index: number) {
    this.arvore.visualizar.nos[index].fill = 'url(#grad2)';
  }

  eventoMouseleave(index: number) {
    this.arvore.visualizar.nos[index].fill = 'url(#grad1)';
  }

  eventoOnclickNo(index: number) {

    const retorno = onClickNo(index,this.arvore,this.nosSelecionados);

    this.arvore=retorno.arvore;
    this.nosSelecionados=retorno.selecao;
    if(this.nosSelecionados.vermelho !== null && this.nosSelecionados.amarelos.length===0){
      this.botoesEnable.ticarNo=true;
      this.botoesEnable.derivacao=false;
      this.botoesEnable.fecharRamo=false;
    }else if(
        this.nosSelecionados.vermelho !== null &&
        this.nosSelecionados.amarelos.length>0 &&
        this.nosSelecionados.amarelos.filter((n)=>this.nosSelecionados.vermelho===n).length>0){
      this.botoesEnable.ticarNo=false;
      this.botoesEnable.derivacao=true;
      this.botoesEnable.fecharRamo=false;
    }else if(
        this.nosSelecionados.vermelho !== null &&
        this.nosSelecionados.amarelos.length>0){
          this.botoesEnable.ticarNo=false;
          this.botoesEnable.derivacao=true;
          this.botoesEnable.fecharRamo=true;
    }
    else{
      this.botoesEnable.ticarNo=false;
      this.botoesEnable.derivacao=false;
      this.botoesEnable.fecharRamo=false;
    }
  }

}
