import { Component, OnInit } from '@angular/core';
import {
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { PainelControleComponent } from '../../painel-controle.component';
import { RespostaService } from './resposta.service';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrls: ['./respostas.component.css'],
})
export class RespostasComponent implements OnInit {
  next = faStepForward;
  prev = faStepBackward;
  listaResposta = [];
  exibirTabela = false;
  buscando = false;
  nextPage = null;
  prevPage = null;
  total = 0;
  from = 0;
  to = 0;

  constructor(
    private service: RespostaService,
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

    this.service.buscarRespostas().subscribe(
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
            const ativo = d.ativo === 1 ?'Ativo':'Inativo' ;
           return { ...d,
            ativo};
          });

          this.exibirTabela = true;
          this.buscando = false;
          this.listaResposta = data;
        } else {
          this.errorMensagem(response.msg);
        }
      },
      error => this.errorMensagem(error.message),
    );
  }

  errorMensagem(error) {
    this.painelCpm.errorMensagen = error;
  }
}
