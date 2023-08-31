import { Component, OnInit, Input } from '@angular/core';
import { Aresta } from 'src/app/common/interfaces/arvore/aresta.model';
import { Linha } from 'src/app/common/interfaces/arvore/linha.model';
import { No } from 'src/app/common/interfaces/arvore/no.model.';

@Component({
  selector: 'app-visualizador-arvore',
  templateUrl: './visualizador-arvore.component.html',
  styleUrls: ['./visualizador-arvore.component.css'],
})
export class VisualizadorArvoreComponent implements OnInit {
  @Input() impressaoNo: No[];
  @Input() impressaoAresta: Aresta[];
  @Input() impressaoLinha: Linha[];
  @Input() width: number;
  @Input() height: number;

  fillColor = 'url(#grad1)';
  constructor() {}
  ngOnInit(): void {}

  alterarcor(index: number) {
    this.impressaoNo[index].fill = 'url(#grad2)';
  }

  voltarcor(index: number) {
    this.impressaoNo[index].fill = 'url(#grad1)';
  }
}
