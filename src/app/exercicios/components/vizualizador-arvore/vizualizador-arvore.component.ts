import { Component, Input, OnInit } from '@angular/core';
import { Aresta } from 'src/app/common/models/arvore/aresta.model';
import { No } from 'src/app/common/models/arvore/no.model.';

@Component({
  selector: 'app-vizualizador-arvore',
  templateUrl: './vizualizador-arvore.component.html',
  styleUrls: ['./vizualizador-arvore.component.css'],
})
export class VizualizadorArvoreComponent implements OnInit {
  @Input() impressaoNo: No[];
  @Input() impressaoAresta: Aresta[];
  @Input() exibirLinha: boolean;
  @Input() width: number;
  @Input() height: number;
  fillColor = 'url(#grad1)';
  constructor() {}

  ngOnInit(): void {
    if(this.exibirLinha){
      const comprimentoTextoDaLinha=200;
      const deslocamento=comprimentoTextoDaLinha/2;
      this.width= this.width + comprimentoTextoDaLinha;
      this.impressaoNo =this.impressaoNo.map((no)=>{
        no.posXno=no.posXno+deslocamento;
        no.posX=no.posX+deslocamento;
        no.posXlinhaDerivacao=no.posXlinhaDerivacao+deslocamento;
        return no;
      });
      this.impressaoAresta =this.impressaoAresta.map((aresta)=>{
        aresta.linhaX1=aresta.linhaX1+deslocamento;
        aresta.linhaX2=aresta.linhaX2+deslocamento;
        return aresta;
      });
    }
  }

  alterarcor(index: number) {
    this.impressaoNo[index].fill = 'url(#grad2)';
  }

  voltarcor(index: number) {
    this.impressaoNo[index].fill = 'url(#grad1)';
  }
}
