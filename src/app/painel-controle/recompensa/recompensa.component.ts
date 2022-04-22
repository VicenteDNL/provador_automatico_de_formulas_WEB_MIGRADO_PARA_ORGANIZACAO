import { Component, Input, OnInit } from '@angular/core';
import { Recompensa } from '../models/recompensa.model';
import { RecompensaService } from './recompensa.service';

@Component({
  selector: 'app-recompensa',
  templateUrl: './recompensa.component.html',
  styleUrls: ['./recompensa.component.css'],
})
export class RecompensaComponent implements OnInit {
  cadastrarColapse = false;
  editarColapse = true;
  recompensaSelecionada;
  listaRecompensas;
  criando = false;
  title = 'Criar Recompensa';
  recompensa: Recompensa;
  exibirFormEditar = true;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() referenciaModal: any;

  constructor(private service: RecompensaService) {}

  // files =null;



  ngOnInit(): void {
    this.service.todasRecompensas().subscribe(
      recompensas => (this.listaRecompensas = recompensas),
      error => (this.listaRecompensas = ['ERROR AO CARREGAR!']),
    );
  }

  cadastrarRecompensa() {
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
      },
    );
  }

  editarRecompensa() {
    this.criando = true;
    this.service.editarRecompensa(this.recompensa).subscribe(
      response => {
        this.criando = false;

        if (response.success) {
          this.referenciaModal.hide();
        } else {
        }
      },
      error => {
        this.criando = false;
      },
    );
  }

  deletarRecompensa() {
    this.criando = true;
    this.service.deletarRecompensa(this.recompensa).subscribe(
      response => {
        this.criando = false;

        if (response.success) {
          this.referenciaModal.hide();
        } else {
        }
      },
      error => {
        this.criando = false;
      },
    );
  }

  exibirColapse(val) {
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

  // public validaArquivo(evento){
  //   let files:FileList =evento.target.files
  //   const fileItem = files.item(0);
  //   this.files = fileItem;
  //   const selectedFiles = <FileList>evento.srcElement.files;
  //   document.getElementById('nome-imagem').innerHTML = (selectedFiles[0].name);
  // }

  preencherForms() {
    this.exibirFormEditar = false;

    this.recompensa = this.listaRecompensas[this.recompensaSelecionada];
  }
}
