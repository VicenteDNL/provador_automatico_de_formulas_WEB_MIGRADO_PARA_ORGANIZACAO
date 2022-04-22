import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tabela-gramatica',
  templateUrl: './tabela-gramatica.component.html',
  styleUrls: ['./tabela-gramatica.component.css'],
})
export class TabelaGramaticaComponent implements OnInit {
  modulos = {
    conectivos: true,
    negacao: false,
    letra: false,
    conclusao: false,
    premissas: false,
  };

  constructor() {}

  ngOnInit(): void {}

  abrirInfo(info) {
    this.modulos.conectivos = false;
    this.modulos.negacao = false;
    this.modulos.letra = false;
    this.modulos.conclusao = false;
    this.modulos.premissas = false;

    switch (info) {
      case 'conectivos':
        this.modulos.conectivos = true;
        break;
      case 'negacao':
        this.modulos.negacao = true;
        break;
      case 'letra':
        this.modulos.letra = true;
        break;
      case 'conclusao':
        this.modulos.conclusao = true;
        break;
      case 'premissas':
        this.modulos.premissas = true;
        break;
      default:
        this.modulos.conectivos = true;
    }
  }
}
