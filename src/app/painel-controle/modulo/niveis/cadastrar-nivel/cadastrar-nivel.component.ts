/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  faArrowAltCircleLeft,
  faPlusSquare,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { NiveisService } from '../../../modulo/niveis/niveis.service';
import { Router } from '@angular/router';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NivelInput } from '../interfaces';

@Component({
  selector: 'app-cadastrar-nivel',
  templateUrl: './cadastrar-nivel.component.html',
  styleUrls: ['./cadastrar-nivel.component.css'],
})
export class CadastrarNivelComponent implements OnInit {
  iconVoltar = faArrowAltCircleLeft;
  iconFechar = faTimes;
  add = faPlusSquare;
  listaRecompensas = [];
  loadingRecompensa = false;
  nivel: NivelInput = {
    nome:'',
    descricao:'',
    ativo:false,
    id_recompensa:null
  };
  semRecompensa = true;
  requisitando = false;
  spineer = false;
  erroSalvar = null;

  // Config Modal logout
  modalRef: BsModalRef;
  message: string;
  // ---

  constructor(
    private service: NiveisService,
    private router: Router,
    private painelCmp: PainelControleComponent,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    this.loadingRecompensa = true;
    this.service.todasRecompensas().subscribe(
      recompensas => this.carregacomboRecompensas(recompensas),
      error => this.errorBuscaRecompensas(error.message),
    );
  }

  cadastrarNivel() {
    this.requisitando = true;
    this.spineer = true;

    this.service.cadastrar(this.nivel).subscribe(
      response => this.sucessoCadastro(response),
      error => this.errorCadastro(error.message),
    );
  }

  sucessoCadastro(response) {
    this.requisitando = false;
    this.spineer = false;
    if (response.success === true) {
      this.router.navigate(['/painel/modulo/niveis']);
    } else {
      this.painelCmp.errorMensagen = response.msg;
    }
  }
  errorCadastro(error) {
    this.spineer = false;
    this.painelCmp.errorMensagen = error;
  }

  carregacomboRecompensas(recompensas) {
    this.loadingRecompensa = false;
    if (recompensas.success === true) {
      this.listaRecompensas = recompensas.data;
    } else {
      this.painelCmp.errorMensagen = recompensas.msg;
    }
  }

  errorBuscaRecompensas(error) {
    this.painelCmp.errorMensagen = error;
  }

  recompensaDesbilita() {
    if (this.semRecompensa === false) {
      this.nivel.id_recompensa = undefined;
    }
  }

  fecharAvisoError() {
    this.erroSalvar = null;
    this.requisitando = false;
  }

  criarRecompensa(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
