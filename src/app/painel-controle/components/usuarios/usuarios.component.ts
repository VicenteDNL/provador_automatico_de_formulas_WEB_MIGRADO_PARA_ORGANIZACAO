import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { PainelControleComponent } from '../../painel-controle.component';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from './interface';
import { Subject } from 'rxjs';
import { PaginationResponse } from 'src/app/common/interfaces/paginationResponse.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  iconDeletar = faTrash;
  iconEditar = faEdit;
  listaUsuarios: Usuario[] = [];
  exibirTabela = false;
  paginacao: PaginationResponse<Usuario[]> | null = null;
  deletarSubject = new Subject<number>();

  constructor(
    private service: UsuariosService,
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
          this.listaUsuarios = response.data.data;
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
