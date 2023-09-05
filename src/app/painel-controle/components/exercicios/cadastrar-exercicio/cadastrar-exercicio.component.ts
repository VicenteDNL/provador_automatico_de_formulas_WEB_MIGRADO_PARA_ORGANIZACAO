/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  faQuestionCircle,
  faEye,
  faExclamationTriangle,
  faPlusSquare,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { ExerciciosService } from '../exercicios.service';
import { Router } from '@angular/router';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';
import { environment } from 'src/environments/environment';
import { Recompensa } from 'src/app/common/interfaces/recompensa.model';
import { ExercicioInput } from '../interfaces';
import { Arvore } from 'src/app/common/interfaces/arvore/arvore.model';
import { Subject } from 'rxjs';
import { ArvoreAutomatica } from 'src/app/common/interfaces/arvore/arvoreAutomatica';
import { ArvoreService } from 'src/app/painel-controle/common/services/arvore.service';
import { Nivel } from 'src/app/common/interfaces/nivel.model';

declare let gramLogic: any;

@Component({
  selector: 'app-cadastrar-exercicio',
  templateUrl: './cadastrar-exercicio.component.html',
  styleUrls: ['./cadastrar-exercicio.component.css'],
})
export class CadastrarExercicioComponent implements OnInit {
  iconDuvida = faQuestionCircle;
  iconVisual = faEye;
  iconErro = faExclamationTriangle;
  iconAdd = faPlusSquare;
  iconEditar = faEdit;

  exercicio: ExercicioInput = {
    nivel_id: 0,
    nome: '',
    ativo: false,
    descricao: '',
    enunciado: '',
    formula: {
      formula: '',
      inicio_personalizado: false,
      ticar_automaticamente: false,
      fechar_automaticamente: false,
      xml: '',
      lista_derivacoes: [],
      lista_fechamento: [],
      lista_ticagem: [],
      lista_passos: [],
      quantidade_regras: 9,
    },
  };

  recompensa: {
    loading: boolean;
    lista: Recompensa[];
    openModal: Subject<any>;
  } = {
    loading: false,
    lista: [],
    openModal: new Subject<any>(),
  };

  nivel: {
    loading: boolean;
    lista: Nivel[];
  } = {
    loading: false,
    lista: [],
  };

  requisitando = false;

  arvoreAutomatica: {
    arvore: ArvoreAutomatica;
    loading: boolean;
    openModal: Subject<boolean>;
  } = {
    arvore: {
      formula: {
        texto: '',
        xml: '',
      },
      visualizar: {
        arestas: [],
        linhas: [],
        nos: [],
        height: 500,
        width: 500,
      },
    },
    loading: false,
    openModal: new Subject<boolean>(),
  };

  formula: {
    isValida: boolean;
    loading: boolean;
    openModalErros: Subject<boolean>;
    openModalInfoGramatica: Subject<boolean>;
    mensagemErro: string;
  } = {
    isValida: false,
    loading: false,
    openModalErros: new Subject<boolean>(),
    openModalInfoGramatica: new Subject<boolean>(),
    mensagemErro: '',
  };

  form = {
    desabilitarInputTempo: false,
    desabilitarInputLimiteErros: false,
  };

  personalizacao = {
    openModal: new Subject<boolean>(),
  };
  arvore: Arvore = {
    derivar: {
      passosExecutados: [],
      regras: [],
    },
    visualizar: {
      arestas: [],
      linhas: [],
      nos: [],
      height: 500,
      width: 500,
    },
    fechar: {
      passosExecutados: [],
      isAutomatico: false,
    },
    ticar: {
      passosExecutados: [],
      isAutomatico: false,
    },
    iniciar: {
      opcoesDisponiveis: [],
      passosExecutados: [],
      isCompleto: false,
    },
    formula: {
      texto: '',
      xml: '',
    },
    isCompleto: false,
  };

  private readonly production = `${environment.production}`;
  constructor(
    private painelCmp: PainelControleComponent,
    private service: ExerciciosService,
    private serviceArvore: ArvoreService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarRecompensas();
    this.carregarNiveis();
  }

  carregarRecompensas() {
    this.recompensa.loading = true;
    this.service.recompensas().subscribe(
      response => {
        this.recompensa.loading = false;
        if (response.success) {
          this.recompensa.lista = response.data;
        } else {
          this.painelCmp.errorMensagen = response.msg;
        }
      },
      error => {
        this.painelCmp.errorMensagen =
          error?.error.msg ?? 'Ocorreu um problema ao executar esta ação';
      },
    );
  }

  carregarNiveis() {
    this.nivel.loading = true;
    this.service.niveis().subscribe(
      response => {
        this.nivel.loading = false;
        if (response.success) {
          this.nivel.lista = response.data;
        } else {
          this.painelCmp.errorMensagen = response.msg;
        }
      },
      error => {
        this.painelCmp.errorMensagen =
          error?.error.msg ?? 'Ocorreu um problema ao executar esta ação';
      },
    );
  }

  salvar() {
    this.requisitando = true;
    this.service.cadastrar(this.exercicio).subscribe(
      response => {
        if ((response.success = true)) {
          this.router.navigate(['/painel/exercicios']);
        } else {
          this.painelCmp.errorMensagen = response.msg;
        }
        this.requisitando = false;
      },
      error => {
        this.requisitando = false;
        this.painelCmp.errorMensagen =
          error?.error.msg ?? 'Ocorreu um problema ao executar esta ação';
      },
    );
  }

  tempoDesbilitar() {
    this.exercicio.tempo = null;
  }

  limiteErrosDesbilitar() {
    this.exercicio.qndt_erros = null;
  }

  abrirInfoGramatica() {
    this.formula.openModalInfoGramatica.next(true);
  }
  abrirErrosGramatica() {
    this.formula.openModalErros.next(true);
  }

  validarFormula() {
    if (this.exercicio.formula.formula) {
      const validacao = gramLogic.validar(
        this.exercicio.formula.formula,
        this.production,
      );

      this.formula.isValida = validacao.sucesso;
      this.exercicio.formula.xml = validacao.sucesso ? validacao.xml : '';
      this.formula.mensagemErro = validacao.sucesso ? '' : validacao.mensagem;

      return;
    }
    this.exercicio.formula.xml = '';
    this.formula.isValida = false;
  }

  abrirArvore() {
    this.arvoreAutomatica.loading = true;
    if (this.exercicio.formula.xml !== '') {
      this.serviceArvore.arvore(this.exercicio.formula.xml).subscribe(
        response => {
          if (response.success) {
            this.arvoreAutomatica.arvore = response.data;
            this.arvoreAutomatica.openModal.next(true);
          } else {
            this.painelCmp.errorMensagen = response.msg;
          }
          this.arvoreAutomatica.loading = false;
        },
        error => {
          this.arvoreAutomatica.loading = false;
          this.painelCmp.errorMensagen =
            error?.error.msg ?? 'Ocorreu um problema ao executar esta ação';
        },
      );
    }
  }

  editarPersonalizacao() {
    this.arvore.derivar.passosExecutados =
      this.exercicio.formula.lista_derivacoes;
    this.arvore.fechar.passosExecutados =
      this.exercicio.formula.lista_fechamento;
    this.arvore.ticar.passosExecutados = this.exercicio.formula.lista_ticagem;
    this.arvore.iniciar.passosExecutados = this.exercicio.formula.lista_passos;
    this.arvore.formula.xml = this.exercicio.formula.xml;

    this.personalizacao.openModal.next(true);
  }

  abriPersonalizacao() {
    if (!this.exercicio.formula.inicio_personalizado) {
      this.arvore.formula.xml = this.exercicio.formula.xml;

      this.personalizacao.openModal.next(true);
    } else {
      this.exercicio.formula.lista_derivacoes = [];
      this.exercicio.formula.lista_fechamento = [];
      this.exercicio.formula.lista_ticagem = [];
      this.exercicio.formula.lista_passos = [];
      this.exercicio.formula.inicio_personalizado = false;
    }
  }

  salvarPersonalizacao(arvore: Arvore | null) {
    if (arvore != null) {
      this.exercicio.formula.lista_derivacoes = arvore.derivar.passosExecutados;
      this.exercicio.formula.lista_fechamento = arvore.fechar.passosExecutados;
      this.exercicio.formula.lista_ticagem = arvore.ticar.passosExecutados;
      this.exercicio.formula.lista_passos = arvore.iniciar.passosExecutados;
    } else {
      this.exercicio.formula.lista_derivacoes = [];
      this.exercicio.formula.lista_fechamento = [];
      this.exercicio.formula.lista_ticagem = [];
      this.exercicio.formula.lista_passos = [];
      this.exercicio.formula.inicio_personalizado = false;
      this.arvore.derivar.passosExecutados = [];
      this.arvore.fechar.passosExecutados = [];
      this.arvore.ticar.passosExecutados = [];
      this.arvore.iniciar.passosExecutados = [];
    }
  }

  abrirRecompensas() {
    this.recompensa.openModal.next(true);
  }
}
