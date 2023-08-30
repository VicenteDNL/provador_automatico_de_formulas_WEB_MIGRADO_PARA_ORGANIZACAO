import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-info-gramatica',
  templateUrl: './modal-info-gramatica.component.html',
  styleUrls: ['./modal-info-gramatica.component.css'],
})
export class ModalInfoGramaticaComponent implements OnInit {
  @Input() openModal: Subject<boolean>;
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
