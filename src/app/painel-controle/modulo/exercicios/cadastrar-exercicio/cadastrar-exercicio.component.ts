/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  faArrowAltCircleLeft,
  faTimes,
  faQuestionCircle,
  faEye,
  faExclamationTriangle,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import {  ExerciciosService } from '../exercicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';
import { Request } from 'src/app/painel-controle/models/request.model';
import { environment } from 'src/environments/environment';
import {Recompensa} from 'src/app/painel-controle/models/recompensa.model';
import { ExercicioInput, RecompensasResponse, Response } from '../interfaces';


declare let gramLogic: any;

@Component({
  selector: 'app-cadastrar-exercicio',
  templateUrl: './cadastrar-exercicio.component.html',
  styleUrls: ['./cadastrar-exercicio.component.css'],
})
export class CadastrarExercicioComponent implements OnInit {

  iconVoltar = faArrowAltCircleLeft;
  iconFechar = faTimes;
  duvida = faQuestionCircle;
  visual = faEye;
  error = faExclamationTriangle;
  add = faPlusSquare;
  listaRecompensas: Recompensa[] = [];
  loadingRecompensa = false;
  exercicio: ExercicioInput = {
    id_nivel:0,
    nome:'',
    ativo:false,
    descricao:'',
    enunciado:'',
    formula:{
      formula:'',
      iniciar_zerada:true,
      inicio_personalizado:false,
      ticar_automaticamente:false,
      xml:'',
      lista_derivacoes: [],
      lista_fechamento: [],
      lista_ticagem: [],
      lista_passos: [],
      inicializacao_completa: false,
      quantidade_regras:9
    }
  };
  requisitando = false;

  tempoDesbilita = false;
  limitarerros = false;
  modalRef: BsModalRef;
  formulaInvalida = false;
  visualizararvore = false;
  mensagemError;

  request = new Request();
  listaImpressaoNo = [];
  listaImpressaoAresta = [];

  listaPassoInicial = [];
  listaDerivacoes = [];
  listaTicagem = [];
  listaFechamento = [];
  inializacaoCompleta = false;

  private readonly production = `${environment.production}`;
  constructor(
    private modalService: BsModalService,
    private service: ExerciciosService,
    private router: Router,
    private route: ActivatedRoute,
    private painetlCmp: PainelControleComponent,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.exercicio.id_nivel = params.idNivel;
    });

    this.loadingRecompensa = true;
    this.service.todasRecompensas().subscribe(
      recompensas => this.carregaComboRecompensas(recompensas),
      error => this.errorBuscaRecompensas(),
    );
  }

  cadastrarExercicio() {
    this.exercicio.formula.lista_derivacoes = this.request.derivacao.lista;
    this.exercicio.formula.lista_fechamento = this.request.fechar.lista;
    this.exercicio.formula.lista_ticagem = this.request.ticar.lista;
    this.exercicio.formula.lista_passos = this.request.inicio.lista;
    this.exercicio.formula.inicializacao_completa =
      this.request.inicio.completa;

    this.requisitando = true;
    this.service.cadastrarExercicio(this.exercicio).subscribe(
      response => this.sucessoCadastro(response),
      error => this.errorCadastro(error.message),
    );
  }

  sucessoCadastro(response: Response) {
    this.requisitando = false;
    if ((response.success = true)) {
      this.router.navigate([
        '/painel/modulo/exercicios/' + this.exercicio.id_nivel,
      ]);
    } else {this.painetlCmp.errorMensagen = response.msg;}
  }
  errorCadastro(response) {
    this.requisitando = false;
    this.painetlCmp.errorMensagen = response;
  }

  carregaComboRecompensas(response: RecompensasResponse) {
    this.listaRecompensas = response.success ? response.data : [];
    this.loadingRecompensa = false;
  }

  errorBuscaRecompensas() {
    this.listaRecompensas = [];
  }

  tempoDesbilitar() {
    this.exercicio.tempo = null;
  }

  limitarerrosDesbilitar() {
    this.exercicio.qndt_erros = null;
  }

  infoGramatica(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }
  errorGramatica(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm' }),
    );
  }

  fechar() {
    this.modalRef.hide();
  }

  validarFormula() {
    if (
      this.exercicio.formula.formula == null ||
      this.exercicio.formula.formula === '' ||
      this.exercicio.formula.formula === undefined
    ) {
      this.exercicio.formula.xml = '';
      this.formulaInvalida = false;
      this.visualizararvore = true;
    } else {
      const validacao = gramLogic.validar(
        this.exercicio.formula.formula,
        this.production,
      );
      if (validacao.sucesso === true) {
        this.formulaInvalida = false;
        this.visualizararvore = true;
        this.exercicio.formula.xml = validacao.xml;
      } else {
        this.formulaInvalida = true;
        this.visualizararvore = false;
        this.mensagemError = validacao.mensagem;
      }
    }
  }

  abrirArvore(template: TemplateRef<any>) {
    if (this.exercicio.formula.xml !== '') {
      this.service.arvoreOtimizada(this.exercicio.formula.xml).subscribe(
        response => {
          this.listaImpressaoNo = response.data.impressao.nos;
          this.listaImpressaoAresta = response.data.impressao.arestas;
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'modal-lg' }),
          );
        },
        error => {},
      );
    }
  }

  iniciarZerada() {
    this.listaPassoInicial = [];
    this.listaDerivacoes = [];
    this.listaTicagem = [];
    this.listaFechamento = [];
    this.exercicio.formula.inicio_personalizado = false;
  }

  modalPersonalizarInicio(template) {
    this.exercicio.formula.iniciar_zerada = false;
    if (this.exercicio.formula.inicio_personalizado !== true) {
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-xl',
        keyboard: false,
      };

      this.modalRef = this.modalService.show(template, config);
    }
  }

  voltar() {
    this.router.navigate([
      '/painel/modulo/exercicios/' + this.exercicio.id_nivel,
    ]);
  }

  criarRecompensa(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
