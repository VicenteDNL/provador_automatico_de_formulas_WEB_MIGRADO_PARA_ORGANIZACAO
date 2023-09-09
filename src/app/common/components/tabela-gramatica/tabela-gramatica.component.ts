import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tabela-gramatica',
  templateUrl: './tabela-gramatica.component.html',
  styleUrls: ['./tabela-gramatica.component.css'],
})
export class TabelaGramaticaComponent implements OnInit {
  @Input() colorBase: string;
  @Input() colorSecundary: string;

  modulos = {
    conectivos: true,
    negacao: false,
    letra: false,
    conclusao: false,
    premissas: false,
  };

  constructor() {}

  @HostListener('mouseenter') onMouseEnter(e: any) {
    if (e !== undefined) {
      e.target.style.color = this.colorBase;
      e.target.style.borderColor = this.colorBase;
    }
  }

  @HostListener('mouseleave') onMouseLeave(e: any) {
    if (e !== undefined) {
      if (!e.target.classList.contains('active')) {
        e.target.style.color = null;
      }
    }
  }

  ngOnInit(): void {}

  abrirInfo(info: string) {
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
