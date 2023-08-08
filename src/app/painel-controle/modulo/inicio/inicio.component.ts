import { Component, OnInit } from '@angular/core';
import { ExerciciosService } from '../../modulo/exercicios/exercicios.service';
import { PainelControleComponent } from '../../painel-controle.component';
import { environment } from 'src/environments/environment';
import { Arestas } from '../../../common/models/arvore/arestas.model';

declare let gramLogic: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  xml;
  listaImpressaoNo;
  listaImpressaoAresta: Arestas[];
  private readonly production = `${environment.production}`;
  constructor(
    private service: ExerciciosService,
    private painelCmp: PainelControleComponent,
  ) {}

  ngOnInit(): void {
    const validacao = gramLogic.validar('P|-(P^P)', this.production);

    if (validacao.sucesso === true) {
      this.service.arvoreOtimizada(validacao.xml, 200).subscribe(
        response => {
          this.listaImpressaoNo = response.data.impressao.nos;
          this.listaImpressaoAresta = response.data.impressao.arestas;
        },
        error => {
          this.errorMensagem(error.message);
        },
      );
    } else {
      this.errorMensagem('Error na geração da árvore!!');
    }
  }

  errorMensagem(msg) {
    this.painelCmp.errorMensagen = msg;
  }
}
