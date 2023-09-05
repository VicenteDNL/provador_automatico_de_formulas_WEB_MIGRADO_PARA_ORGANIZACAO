import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Aresta } from 'src/app/common/interfaces/arvore/aresta.model';
import { Linha } from 'src/app/common/interfaces/arvore/linha.model';
import { No } from 'src/app/common/interfaces/arvore/no.model.';

@Component({
  selector: 'app-vizualizador-arvore',
  templateUrl: './vizualizador-arvore.component.html',
  styleUrls: ['./vizualizador-arvore.component.css'],
})
export class VizualizadorArvoreComponent implements OnInit {
  @Input() impressaoNo: No[];
  @Input() impressaoAresta: Aresta[];
  @Input() impressaoLinha: Linha[];

  @Input() exibirLinha: boolean;
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
