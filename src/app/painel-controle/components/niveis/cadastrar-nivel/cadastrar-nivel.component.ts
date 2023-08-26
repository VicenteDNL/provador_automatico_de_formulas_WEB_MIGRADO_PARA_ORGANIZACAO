/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';
import { NivelInput } from '../interfaces';
import { NiveisService } from '../niveis.service';
import { Recompensa } from 'src/app/common/models/recompensa.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cadastrar-nivel',
  templateUrl: './cadastrar-nivel.component.html',
  styleUrls: ['./cadastrar-nivel.component.css'],
})
export class CadastrarNivelComponent implements OnInit {
  addIcon = faPlusSquare;
  listaRecompensas: Recompensa[] = [];
  loadingRecompensa = false;
  nivel: NivelInput = {
    nome: '',
    descricao: '',
    ativo: false,
    id_recompensa: null,
  };
  semRecompensa = true;
  requisitando = false;
  openRecompensasSubject = new Subject<any>();

  constructor(
    private service: NiveisService,
    private router: Router,
    private painelCmp: PainelControleComponent,
  ) {}

  ngOnInit(): void {}

  carregarRecompensas() {
    this.loadingRecompensa = true;
    this.service.recompensas().subscribe(
      recompensas => {
        this.loadingRecompensa = false;
        if (recompensas.success === true) {
          this.listaRecompensas = recompensas.data;
        } else {
          this.painelCmp.errorMensagen = recompensas.msg;
        }
      },
      error => {
        this.painelCmp.errorMensagen =
          error?.error.msg ?? 'Ocorreu um problema ao executar esta ação';
      },
    );
  }

  salvar() {
    this.requisitando = true;
    if (this.semRecompensa === false) {
      this.nivel.id_recompensa = undefined;
    }
    this.service.cadastrar(this.nivel).subscribe(
      response => {
        this.requisitando = false;
        if (response.success === true) {
          this.router.navigate(['/painel/niveis']);
        } else {
          this.painelCmp.errorMensagen = response.msg;
        }
      },
      error => (this.painelCmp.errorMensagen = error.error.message),
    );
  }

  abrirRecompensas() {
    this.openRecompensasSubject.next();
  }

  disbleaEnableRecompensa(event: any) {
    if (event) {
      this.listaRecompensas = [];
      this.nivel.id_recompensa = null;
      return;
    }
    this.carregarRecompensas();
  }
}
