/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Recompensa } from 'src/app/common/interfaces/recompensa.model';
import { NivelInput, NivelResponse } from '../interfaces';
import { NiveisService } from '../niveis.service';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-nivel',
  templateUrl: './editar-nivel.component.html',
  styleUrls: ['./editar-nivel.component.css'],
})
export class EditarNivelComponent implements OnInit {
  addIcon = faPlusSquare;
  listaRecompensas: Recompensa[] = [];
  loadingRecompensa = false;
  nivel: NivelInput = {
    nome: '',
    descricao: '',
    ativo: false,
    recompensa_id: null,
  };
  semRecompensa = true;
  requisitando = true;
  openRecompensasSubject = new Subject<any>();

  constructor(
    private service: NiveisService,
    private router: Router,
    private painelCmp: PainelControleComponent,
    private route: ActivatedRoute,
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
            this.nivel = {
              id: data.id,
              nome: data.nome,
              descricao: data.descricao,
              ativo: data.ativo,
              recompensa_id: data.recompensa_id ?? null,
            };
            this.semRecompensa = data.recompensa_id == null;
            this.carregarRecompensas();
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
    this.loadingRecompensa = true;
    this.service.recompensas().subscribe(
      recompensas => {
        this.loadingRecompensa = false;
        if (recompensas.success === true) {
          this.listaRecompensas = recompensas.data;
        } else {
          this.painelCmp.errorMensagen = recompensas.msg;
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
    this.service.editar(this.nivel).subscribe(
      response => {
        this.requisitando = false;
        if (response.success === true) {
          this.router.navigate(['/painel/niveis']);
        } else {
          this.painelCmp.errorMensagen = response.msg;
        }
      },
      error => {
        this.painelCmp.errorMensagen = error.error.message;
      },
    );
  }

  abrirRecompensas() {
    this.openRecompensasSubject.next();
  }

  disbleaEnableRecompensa(event: any) {
    if (event) {
      this.listaRecompensas = [];
      this.nivel.recompensa_id = null;
      return;
    }
    this.carregarRecompensas();
  }
}
