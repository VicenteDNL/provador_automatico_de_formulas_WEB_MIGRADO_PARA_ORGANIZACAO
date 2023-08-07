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

@Component({
  selector: 'app-niveis',
  templateUrl: './niveis.component.html',
  styleUrls: ['./niveis.component.css'],
})
export class NiveisComponent implements OnInit {
  // ------ Icones Fortawesome --------
  iconDeletar = faTrash;
  iconEditar = faEdit;
  next = faStepForward;
  prev = faStepBackward;
  iconFechar = faTimes;
  // --------------

  listaNiveis = [];
  exibirTabela = false;
  buscando = false;
  nextPage = null;
  prevPage = null;
  total = 0;
  from = 0;
  to = 0;

  excluindo = false;
  modalRef: BsModalRef;
  idNivelDeletar: number|null = null; ;

  constructor(
    private modalService: BsModalService,
    private service: NiveisService,
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

          const data = response.data.data.map((d)=>{
            const ativo = d.ativo ?'Ativo':'Inativo' ;
           return { ...d,
            ativo};
          });
          this.buscando = false;
          this.exibirTabela = true;
          this.listaNiveis = data;
        } else {
          this.errorMensagem(response.msg);
          return [];
        }
      },
      error => this.errorMensagem(error.message),
    );
  }

  errorMensagem(error) {
    this.painelCpm.errorMensagen = error;
  }

  abrirEdicao(id) {
    this.router.navigate(['/painel/modulo1/niveis/editar', id]);
  }

  deletar(template: TemplateRef<any>, id: number) {
    this.idNivelDeletar = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmarDelete() {
    this.excluindo = true;
    this.service.deletar(this.idNivelDeletar).subscribe(
      response => this.sucessoDelecao(response),
      error => this.erroDelecao(error),
    );
  }

  cancelarDelete() {
    this.modalRef.hide();
  }

  sucessoDelecao(response) {
    this.modalRef.hide();
    this.excluindo = false;
    if (response.success) {
      this.carregarLista();
    } else {
      this.errorMensagem(response.msg);
    }
  }

  erroDelecao(error) {
    this.excluindo = false;
    this.errorMensagem(error.message);
    this.modalRef.hide();
  }
}
