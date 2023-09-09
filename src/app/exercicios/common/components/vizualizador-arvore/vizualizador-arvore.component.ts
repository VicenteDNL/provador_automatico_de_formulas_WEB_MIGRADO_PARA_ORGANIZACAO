import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Aresta } from 'src/app/common/interfaces/arvore/aresta.model';
import { Linha } from 'src/app/common/interfaces/arvore/linha.model';
import { No } from 'src/app/common/interfaces/arvore/no.model.';

@Component({
  selector: 'app-vizualizador-arvore',
  templateUrl: './vizualizador-arvore.component.html',
  styleUrls: ['./vizualizador-arvore.component.css'],
})
export class VizualizadorArvoreComponent implements OnInit {
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
    console.log('danilo');

    this.abrirArvoreSubject.subscribe(value => {
      console.log({ value });
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

  alterarcor(index: number) {
    this.impressaoNo[index].fill = 'url(#grad2)';
  }

  voltarcor(index: number) {
    this.impressaoNo[index].fill = 'url(#grad1)';
  }
}
