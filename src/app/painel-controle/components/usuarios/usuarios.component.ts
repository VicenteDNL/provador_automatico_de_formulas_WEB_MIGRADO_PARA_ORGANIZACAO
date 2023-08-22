import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuariosService } from './usuarios.service';
import { Router } from '@angular/router';
import { PainelControleComponent } from '../../painel-controle.component';
import { faEdit, faStepBackward, faStepForward, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Response, Usuario } from './interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    // ------ Icones Fortawesome --------
    iconDeletar = faTrash;
    iconEditar = faEdit;
    next = faStepForward;
    prev = faStepBackward;
    iconFechar = faTimes;
    // --------------

    listaUsuarios: Usuario[]=[];
    exibirTabela = false;
    buscando = false;
    nextPage = null;
    prevPage = null;
    total = 0;
    from = 0;
    to = 0;

    excluindo = false;
    modalRef: BsModalRef;
    idUsuarioDeletar: number|null = null; ;

  constructor(    private modalService: BsModalService,
    private service: UsuariosService,
    private router: Router,
    private painelCpm: PainelControleComponent,
  ) {}

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista(acao = null) {
    this.exibirTabela = false;
    this.buscando = true;
    let page;
    switch (acao) {
      case 'next':
        page = this.nextPage;
        break;
      case 'prev':
        page = this.prevPage;
        break;
      case null:
        page = '1';
        break;
      default:
        page = '1';
    }

    this.service.listar(page).subscribe(
      response => {
        if (response.success === true) {
          // PreparandoPaginação
          const next = response.data.next_page_url;
          this.nextPage =
            next == null ? 0 : next.substr(next.indexOf('=') + 1, next.length);

          const prev = response.data.prev_page_url;
          this.prevPage =
            prev == null ? 0 : prev.substr(prev.indexOf('=') + 1, prev.length);

          this.total = response.data.total;
          this.from =
            response.data.from != null ? response.data.from : 0;
          this.to = response.data.to != null ? response.data.to : 0;
          // ----------------------------------------------------


          this.buscando = false;
          this.exibirTabela = true;
          this.listaUsuarios = response.data.data;
        } else {
          this.errorMensagem(response.msg);
          return [];
        }
      },
      error => this.errorMensagem(error.error.msg ?? 'Ocorreu um erro ao listar'),
    );
  }

  errorMensagem(error: string) {
    this.painelCpm.errorMensagen = error;
  }

  abrirEdicao(id: number) {
    this.router.navigate(['/painel/usuarios/editar', id]);
  }

  deletar(template: TemplateRef<any>, id: number) {
    this.idUsuarioDeletar = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmarDelete() {
    this.excluindo = true;
    this.service.deletar(this.idUsuarioDeletar).subscribe(
      response => this.sucessoDelecao(response),
      error => this.erroDelecao(error.error.msg),
    );
  }

  cancelarDelete() {
    this.modalRef.hide();
  }

  sucessoDelecao(response: Response) {
    this.modalRef.hide();
    this.excluindo = false;
    if (response.success) {
      this.carregarLista();
    } else {
      this.erroDelecao(response.msg);
    }
  }

  erroDelecao(error: string) {
    this.excluindo = false;
    this.errorMensagem(error);
    this.modalRef.hide();
  }



}
