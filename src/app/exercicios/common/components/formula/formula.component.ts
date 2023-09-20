import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Formula } from '../../../../common/models/Formula';
import { ArvoreAutomatica } from '../../../../common/interfaces/arvore/arvoreAutomatica';
import { Subject } from 'rxjs';
import { ArvoreService } from 'src/app/painel-controle/common/services/arvore.service';
import {
  faExclamationTriangle,
  faEye,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
})
export class FormulaComponent implements OnInit {
  @Input() formula: Formula;
  @Output() eventConfirm = new EventEmitter<Formula>();
  iconDuvida = faQuestionCircle;
  iconVisual = faEye;
  iconErro = faExclamationTriangle;
  openModalInfoGramatica = new Subject<boolean>();
  openModalErros = new Subject<boolean>();
  openModalArvore = new Subject<boolean>();
  arvoreAutomatica: {
    arvore: ArvoreAutomatica;
    loading: boolean;
  } = {
    arvore: {
      formula: {
        texto: '',
        xml: '',
      },
      visualizar: {
        arestas: [],
        linhas: [],
        nos: [],
        height: 500,
        width: 500,
      },
    },
    loading: false,
  };
  formulaInput = '';
  constructor(private serviceArvore: ArvoreService) {}

  ngOnInit(): void {}

  abrirInfoGramatica() {
    this.openModalInfoGramatica.next(true);
  }
  abrirErrosGramatica() {
    this.openModalErros.next(true);
  }

  abrirArvore() {
    this.arvoreAutomatica.loading = true;
    if (this.formula.getXml() !== '') {
      this.serviceArvore.arvore(this.formula.getXml()).subscribe(
        response => {
          if (response.success) {
            this.arvoreAutomatica.arvore = response.data;
            this.openModalArvore.next(true);
          } else {
            // this.abrirAvisoError(response.msg);
          }
          this.arvoreAutomatica.loading = false;
        },
        error => {
          this.arvoreAutomatica.loading = false;
          // this.abrirAvisoError('Ops! Ocorreu um erro ao gerar a árvore');
        },
      );
    }
  }

  validarFormula() {
    this.formula.validar(this.formulaInput);
  }
  comecar() {
    this.eventConfirm.emit(this.formula);
  }
}
