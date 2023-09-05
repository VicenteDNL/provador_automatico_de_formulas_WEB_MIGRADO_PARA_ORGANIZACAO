import { Component, OnInit } from '@angular/core';
import {
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { PainelControleComponent } from '../../painel-controle.component';
import { RespostaService } from './resposta.service';
import { PaginationResponse } from 'src/app/common/interfaces/paginationResponse.model';
import { RespostasUsuarios } from 'src/app/common/interfaces/respostasUsuarios.model';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrls: ['./respostas.component.css'],
})
export class RespostasComponent implements OnInit {
  listaResposta = [];
  exibirTabela = false;
  paginacao: PaginationResponse<RespostasUsuarios[]> | null = null;

  constructor(
    private service: RespostaService,
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
          this.listaResposta = response.data.data;
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
}
