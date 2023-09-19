/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  faBan,
  faStepBackward,
  faStepForward,
  faTrash,
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
  iconDeletar = faTrash;
  listaResposta = [];
  exibirTabela = false;
  paginacao: PaginationResponse<RespostasUsuarios[]> | null = null;
  listaJogadores = [];
  listaExercicios = [];
  listaNiveis = [];
  pesquisando = false;
  search = {
    jogador_id: null,
    exercicio_id: null,
    completa: null,
    ativa: null,
  };

  constructor(
    private service: RespostaService,
    private painelCpm: PainelControleComponent,
  ) {}

  ngOnInit(): void {
    this.carregarLista(1);
    this.jogadores();
    this.exercicios();
    this.niveis();
  }

  carregarLista(page: number) {
    this.service.listar(page, this.search).subscribe(
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

  jogadores() {
    this.service.jogadores().subscribe(
      response => {
        if (response.success === true) {
          this.listaJogadores = response.data;
        } else {
          this.painelCpm.errorMensagen = response.msg;
        }
      },
      error =>
        (this.painelCpm.errorMensagen =
          error.error.msg ?? 'Ocorreu um erro ao buscar jogadores'),
    );
  }

  exercicios() {
    this.service.exercicios().subscribe(
      response => {
        if (response.success === true) {
          this.listaExercicios = response.data;
        } else {
          this.painelCpm.errorMensagen = response.msg;
        }
      },
      error =>
        (this.painelCpm.errorMensagen =
          error.error.msg ?? 'Ocorreu um erro ao buscar exercicios'),
    );
  }

  niveis() {
    this.service.niveis().subscribe(
      response => {
        if (response.success === true) {
          this.listaNiveis = response.data;
        } else {
          this.painelCpm.errorMensagen = response.msg;
        }
      },
      error =>
        (this.painelCpm.errorMensagen =
          error.error.msg ?? 'Ocorreu um erro ao buscar niveis'),
    );
  }

  desativar(id: number) {
    alert('funcionalidade ainda não implementada');
  }
}
