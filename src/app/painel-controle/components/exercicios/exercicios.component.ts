import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Exercicio } from 'src/app/common/interfaces/exercicio.model';
import { PaginationResponse } from 'src/app/common/interfaces/paginationResponse.model';
import { PainelControleComponent } from '../../painel-controle.component';
import { ExerciciosService } from './exercicios.service';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.css'],
})
export class ExerciciosComponent implements OnInit {
  iconDeletar = faTrash;
  iconEditar = faEdit;
  listaExercicios: Exercicio[] = [];
  exibirTabela = false;
  paginacao: PaginationResponse<Exercicio[]> | null = null;
  deletarSubject = new Subject<number>();

  constructor(
    private service: ExerciciosService,
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
          this.listaExercicios = response.data.data;
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
