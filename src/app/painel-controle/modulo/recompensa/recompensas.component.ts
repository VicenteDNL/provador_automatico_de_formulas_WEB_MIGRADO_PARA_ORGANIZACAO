import { Component, Input, OnInit } from '@angular/core';
import { RecompensaService } from './recompensas.service';
import { RecompensaInput } from './interfaces';
import { Recompensa } from 'src/app/common/models/recompensa.model';

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.component.html',
  styleUrls: ['./recompensas.component.css'],
})
export class RecompensasComponent implements OnInit {
  cadastrarColapse = false;
  editarColapse = true;
  idRecompensaSelecionada: number;
  listaRecompensas: Recompensa[];
  criando = false;
  title = 'Criar Recompensa';
  recompensa: RecompensaInput =  {
    nome: '',
    pontuacao: 0
  };
  exibirFormEditar = true;
  error=false;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() referenciaModal: any;

  constructor(private service: RecompensaService) {}

  ngOnInit(): void {
    this.service.todasRecompensas().subscribe(
      response => (this.listaRecompensas = response.success === true ?response.data:[]),
      error => (this.listaRecompensas = []),
    );
  }

  cadastrarRecompensa() {
    this.error=false;
    this.criando = true;
    this.service.cadastrarRecompensa(this.recompensa).subscribe(
      response => {
        this.criando = false;

        if (response.success) {
          this.referenciaModal.hide();
        } else {
        }
      },
      error => {
        this.criando = false;
        this.error=true;
      },
    );
  }

  editarRecompensa() {
    this.error=false;
    this.criando = true;
    this.service.editarRecompensa(this.recompensa).subscribe(
      response => {
        this.criando = false;

        if (response.success) {
          this.referenciaModal.hide();
        }
      },
      error => {
        this.criando = false;
        this.error=true;
      },
    );
  }

  deletarRecompensa() {
    this.error=false;
    this.criando = true;
    this.service.deletarRecompensa(this.recompensa.id).subscribe(
      response => {
        this.criando = false;

        if (response.success) {
          this.referenciaModal.hide();
        } else {
        }
      },
      error => {
        this.criando = false;
        this.error=true;
      },
    );
  }

  exibirColapse(val: number) {
    this.error = false;
    if (val === 1 && this.cadastrarColapse) {
      this.title = 'Criar Recompensa';
      this.cadastrarColapse = !this.cadastrarColapse;
      this.editarColapse = !this.editarColapse;
    } else if (val === 2 && this.editarColapse) {
      this.title = 'Editar Recompensa';
      this.cadastrarColapse = !this.cadastrarColapse;
      this.editarColapse = !this.editarColapse;
    }
  }

  fecharAvisoError() {
    this.error = false;
  }

  preencherForms() {
    this.exibirFormEditar = false;
    this.recompensa = this.listaRecompensas[this.idRecompensaSelecionada];
  }
}
