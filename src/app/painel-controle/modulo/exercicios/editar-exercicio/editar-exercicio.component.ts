/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { map, switchMap } from 'rxjs/operators';
import { Exercicio } from 'src/app/painel-controle/models/exercicio.model';
import { Formula } from 'src/app/painel-controle/models/formula.model';
import { Nivel } from 'src/app/painel-controle/models/nivel.model';
import { Recompensa } from 'src/app/painel-controle/models/recompensa.model';
import { ExerciciosService } from '../exercicios.service';
import { ExercicioInput, ExercicioResponse, RecompensasResponse, Response } from '../interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-editar-exercicio',
  templateUrl: './editar-exercicio.component.html',
  styleUrls: ['./editar-exercicio.component.css'],
})
export class EditarExercicioComponent implements OnInit {
  exercicio: Exercicio;
  requisitando: boolean;
  spineer: boolean;
  visual = faEye;
  iconVoltar = faArrowAltCircleLeft;
  erroSalvar = null;
  listaRecompensas: Recompensa[] = [];
  loadingRecompensa = false;
  listaImpressaoNo = [];
  listaImpressaoAresta = [];
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private service: ExerciciosService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap(id => {
          this.requisitando = true;
          this.spineer = true;
          return this.service.buscarPorId(id);
        }),
      )
      .subscribe(
        response => this.carregarExercicio(response),
        error => this.errorExercicio(error),
      );

    this.service.todasRecompensas().subscribe(
      recompensas => this.carregaComboRecompensas(recompensas),
      error => this.errorBuscaRecompensas(),
    );
  }

  carregarExercicio(response: ExercicioResponse) {
    this.exercicio = response.success ? response.data:null;
    this.requisitando = false;
    this.spineer = false;
  }

  carregaComboRecompensas(response: RecompensasResponse) {
    this.listaRecompensas = response.success ? response.data : [];
    this.loadingRecompensa = false;
  }
  errorBuscaRecompensas() {
    this.listaRecompensas = [];
  }
  errorExercicio(error) {}

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

  fechar() {
    this.modalRef.hide();
  }

  editarExercicio() {
    this.requisitando = true;
    this.spineer = true;
    const exercicio: ExercicioInput = {
      id: this.exercicio.id,
      nome: this.exercicio.nome,
      enunciado: this.exercicio.enunciado,
      descricao: this.exercicio.descricao,
      ativo: this.exercicio.ativo,
      id_nivel:this.exercicio.id_nivel,
    };

    this.service.editar(exercicio).subscribe(
      response => this.sucessoEdicao(response),
      error => this.errorNivel(error),
    );
  }

  sucessoEdicao(response: Response) {
    this.requisitando = false;
    this.spineer = false;
    if(response.success){
      this.router.navigate([
        '/painel/modulo/exercicios/' + this.exercicio.id_nivel,
      ]);
    }
  }

  errorNivel(response: any) {
    this.spineer = false;
    this.erroSalvar = response?.message || 'Erro';
  }

  voltar() {
    this.router.navigate([
      '/painel/modulo/exercicios/' + this.exercicio.id_nivel,
    ]);
  }
}
