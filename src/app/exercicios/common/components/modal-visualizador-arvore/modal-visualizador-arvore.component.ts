import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Aresta } from 'src/app/common/interfaces/arvore/aresta.model';
import { Linha } from 'src/app/common/interfaces/arvore/linha.model';
import { No } from 'src/app/common/interfaces/arvore/no.model.';

@Component({
  selector: 'app-modal-visualizador-arvore',
  templateUrl: './modal-visualizador-arvore.component.html',
  styleUrls: ['./modal-visualizador-arvore.component.css'],
})
export class ModalVisualizadorArvoreComponent implements OnInit {
  @Input() abrirArvoreSubject: Subject<boolean>;
  @Input() impressaoNo: No[];
  @Input() impressaoAresta: Aresta[];
  @Input() impressaoLinha: Linha[];
  @Input() width: number;
  @Input() height: number;

  @ViewChild('autoShownModal', { static: false })
  autoShownModal?: ModalDirective;
  show = false;
  fillColor = 'url(#grad1)';
  constructor() {}

  ngOnInit(): void {
    this.abrirArvoreSubject.subscribe(value => {
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
