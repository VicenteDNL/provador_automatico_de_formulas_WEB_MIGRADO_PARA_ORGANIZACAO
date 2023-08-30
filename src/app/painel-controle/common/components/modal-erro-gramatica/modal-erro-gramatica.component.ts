import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-erro-gramatica',
  templateUrl: './modal-erro-gramatica.component.html',
  styleUrls: ['./modal-erro-gramatica.component.css'],
})
export class ModalErroGramaticaComponent implements OnInit {
  @Input() openModal: Subject<boolean>;
  @Input() erros: { linha: number; coluna: number; info: string[] }[];
  @ViewChild('autoShownModal', { static: false })
  autoShownModal?: ModalDirective;
  show = false;
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
}
