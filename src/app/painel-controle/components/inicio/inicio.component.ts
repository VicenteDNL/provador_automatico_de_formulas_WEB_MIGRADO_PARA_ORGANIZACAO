import { Component, OnInit } from '@angular/core';
import { ExerciciosService } from '../../modulo/exercicios/exercicios.service';
import { PainelControleComponent } from '../../painel-controle.component';
import { environment } from 'src/environments/environment';
import { Aresta } from '../../../common/models/arvore/aresta.model';
import { No } from 'src/app/common/models/arvore/no.model.';
import { InicioService } from './inicio.service';

declare let gramLogic: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  listaImpressaoNo: No[];
  listaImpressaoAresta: Aresta[];
  widthCanvas: number;
  private readonly production = `${environment.production}`;
  constructor(
    private service: InicioService,
    private painelCmp: PainelControleComponent,
  ) {}

  ngOnInit(): void {
    const validacao = gramLogic.validar('P|-(P^P)', this.production);

    if (validacao.sucesso === true) {
      this.service.arvore(validacao.xml, 200).subscribe(
        response => {
          if (response.success) {
            this.listaImpressaoNo = response.data.visualizar.nos;
            this.listaImpressaoAresta = response.data.visualizar.arestas;
            this.widthCanvas = response.data.visualizar.width;
          } else {
            this.painelCmp.errorMensagen = response.msg;
          }
        },
        error => {
          this.painelCmp.errorMensagen =
            error?.error.message ?? 'Ocorreu um erro ao buscar árvore';
        },
      );
    } else {
      this.painelCmp.errorMensagen = 'Erro na geração da árvore';
    }
  }
}
