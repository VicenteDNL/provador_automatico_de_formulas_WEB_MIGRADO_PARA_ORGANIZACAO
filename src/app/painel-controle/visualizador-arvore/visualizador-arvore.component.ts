import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualizador-arvore',
  templateUrl: './visualizador-arvore.component.html',
  styleUrls: ['./visualizador-arvore.component.css'],
})
export class VisualizadorArvoreComponent implements OnInit {
  @Input() impressaoNo: Array<any>;
  @Input() impressaoAresta: Array<any>;
  @Input() exibirLinha: boolean;
  @Input() width: number;
  @Input() height: number;

  fillColor = 'url(#grad1)';
  constructor() {}
  ngOnInit(): void {}

  alterarcor(index) {
    this.impressaoNo[index].fill = 'url(#grad2)';
  }

  voltarcor(index) {
    this.impressaoNo[index].fill = 'url(#grad1)';
  }
}
