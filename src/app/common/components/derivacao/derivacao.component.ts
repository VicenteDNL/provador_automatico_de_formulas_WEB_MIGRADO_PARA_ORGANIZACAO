import { Component, Input, OnInit } from '@angular/core';
import { ArvoreManager } from '../../models/ArvoreManager';
import { Selecao } from '../../models/Selecao';

@Component({
  selector: 'app-derivacao',
  templateUrl: './derivacao.component.html',
  styleUrls: ['./derivacao.component.css'],
})
export class DerivacaoComponent implements OnInit {
  @Input() color: string;
  @Input() colorBase: string;
  @Input() colorBaseFinal: string;
  @Input() colorSecundary: string;
  @Input() colorSecundaryFinal: string;
  @Input() arvoreManager: ArvoreManager;
  @Input() selecao: Selecao;

  constructor() {}

  ngOnInit(): void {}
}
