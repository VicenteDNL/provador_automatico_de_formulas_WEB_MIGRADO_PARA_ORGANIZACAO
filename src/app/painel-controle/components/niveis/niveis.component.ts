import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  faTrash,
  faEdit,
  faStepForward,
  faStepBackward,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { NiveisService } from './niveis.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PainelControleComponent } from '../../painel-controle.component';
import { Nivel } from 'src/app/common/models/nivel.model';
import { PaginationResponse } from 'src/app/common/models/paginationResponse.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-niveis',
  templateUrl: './niveis.component.html',
  styleUrls: ['./niveis.component.css'],
})
export class NiveisComponent implements OnInit {
  iconDeletar = faTrash;
  iconEditar = faEdit;
  listaNiveis: Nivel[] = [];
  exibirTabela = false;
  paginacao: PaginationResponse<Nivel[]> | null = null;
  deletarSubject = new Subject<number>();

  constructor(
    private service: NiveisService,
    private painelCpm: PainelControleComponent,
  ) {}

  ngOnInit(): void {
    this.carregarLista(1);
  }

  carregarLista(page: number) {
    this.service.listar(page).subscribe(
      response => {
        if (response.success === true) {
          this.exibirTabela = true;
          this.listaNiveis = response.data.data;
          this.paginacao = response.data;
        } else {
          this.painelCpm.errorMensagen = response.msg;
        }
      },
      error =>
        (this.painelCpm.errorMensagen =
          error.error.msg ?? 'Ocorreu um erro ao listar'),
    );
  }

  deletar(id: number) {
    this.deletarSubject.next(id);
  }

  confirmarDelete(id: number) {
    this.exibirTabela = false;
    this.paginacao = null;
    this.service.deletar(id).subscribe(
      response => {
        if (response.success) {
          this.carregarLista(1);
        } else {
          this.painelCpm.errorMensagen = response.msg;
        }
        this.deletarSubject.next(null);
      },
      error => (this.painelCpm.errorMensagen = error.error.msg),
    );
  }
}
