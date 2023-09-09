import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-regras-gramlogic',
  templateUrl: './regras-gramlogic.component.html',
  styleUrls: ['./regras-gramlogic.component.css'],
})
export class RegrasGramlogicComponent implements OnInit {
  @Input() openModal: Subject<boolean>;
  @ViewChild('autoShownModal', { static: false })
  autoShownModal?: ModalDirective;
  show = false;
  modulos = {
    conectivos: true,
    negacao: false,
    letra: false,
    conclusao: false,
    premissas: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.openModal.subscribe(value => {
      if (value) {
        this.showModal();
      } else {
        this.hideModal();
      }
    });
  }

  showModal(): void {
    this.show = true;
  }
  hideModal(): void {
    this.autoShownModal?.hide();
  }
  onHide(): void {
    this.show = false;
  }

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
