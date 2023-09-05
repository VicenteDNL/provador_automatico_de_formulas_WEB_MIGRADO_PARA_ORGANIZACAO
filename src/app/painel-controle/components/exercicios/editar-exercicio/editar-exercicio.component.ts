/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faEdit,
  faExclamationTriangle,
  faEye,
  faPlusSquare,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { map, switchMap } from 'rxjs/operators';
import { Recompensa } from 'src/app/common/interfaces/recompensa.model';
import { ExerciciosService } from '../exercicios.service';
import { ExercicioInput } from '../interfaces';
import { Subject } from 'rxjs';
import { ArvoreAutomatica } from 'src/app/common/interfaces/arvore/arvoreAutomatica';
import { Nivel } from 'src/app/common/interfaces/nivel.model';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';
import { Arvore } from 'src/app/common/interfaces/arvore/arvore.model';
import { ArvoreService } from 'src/app/painel-controle/common/services/arvore.service';
import { environment } from 'src/environments/environment';

declare let gramLogic: any;

@Component({
  selector: 'app-editar-exercicio',
  templateUrl: './editar-exercicio.component.html',
  styleUrls: ['./editar-exercicio.component.css'],
})
export class EditarExercicioComponent implements OnInit {
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
    isValida: true,
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
    private route: ActivatedRoute,
    private service: ExerciciosService,
    private router: Router,
    private painelCmp: PainelControleComponent,
    private serviceArvore: ArvoreService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap(id => {
          this.requisitando = true;
          return this.service.buscar(id);
        }),
      )
      .subscribe(
        response => {
          if (response.success === true) {
            const { data } = response;
            this.requisitando = false;
            this.exercicio = {
              id: data.id,
              nome: data.nome,
              descricao: data.descricao,
              ativo: data.ativo,
              recompensa_id: data.recompensa_id ?? null,
              enunciado: data.enunciado,
              nivel_id: data.nivel_id,
              tempo: data.tempo,
              qndt_erros: data.qndt_erros,
              formula: {
                formula: data.formula.formula,
                inicio_personalizado: data.formula.inicio_personalizado,
                ticar_automaticamente: data.formula.ticar_automaticamente,
                fechar_automaticamente: data.formula.fechar_automaticamente,
                xml: data.formula.xml,
                lista_derivacoes: data.formula.lista_derivacoes,
                lista_fechamento: data.formula.lista_fechamento,
                lista_ticagem: data.formula.lista_ticagem,
                lista_passos: data.formula.lista_passos,
                quantidade_regras: data.formula.quantidade_regras,
              },
            };
            if (data.tempo > 0) {
              this.form.desabilitarInputTempo = true;
            }
            if (data.qndt_erros > 0) {
              this.form.desabilitarInputLimiteErros = true;
            }
            this.carregarRecompensas();
            this.carregarNiveis();
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
    this.service.editar(this.exercicio).subscribe(
      response => {
        this.requisitando = false;
        if (response.success === true) {
          this.router.navigate(['/painel/exercicios']);
        } else {
          this.painelCmp.errorMensagen = response.msg;
        }
      },
      error => {
        this.painelCmp.errorMensagen =
          error.error.message ?? 'Ocorreu um problema ao executar esta ação';
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
