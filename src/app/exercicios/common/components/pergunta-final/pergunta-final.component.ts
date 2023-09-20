import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Resposta } from 'src/app/common/enums/Resposta';
import { PassoFinalizar } from 'src/app/common/interfaces/passo/PassoFinalizar';
import { Console } from 'src/app/common/models/Console';
import { Passos } from 'src/app/common/models/Passos';

@Component({
  selector: 'app-pergunta-final',
  templateUrl: './pergunta-final.component.html',
  styleUrls: ['./pergunta-final.component.css'],
})
export class PerguntaFinalComponent implements OnInit {
  @Input() console: Console;
  @Input() passos: Passos;
  @Output() eventConfirm = new EventEmitter<PassoFinalizar>();

  resposta = {
    valor: null,
    sucesso: null,
    classes: {
      contradicao: { 'select-contradicao': false },
      tautologia: { 'select-tautologia': false },
    },
  };
  constructor() {}

  ngOnInit(): void {}

  seleciona(resp: string) {
    if (resp === 'TAUTOLOGIA') {
      this.resposta.classes.contradicao = { 'select-contradicao': false };
      this.resposta.classes.tautologia = { 'select-tautologia': true };
      this.passos.setFinalizar(Resposta.tautologia);
    } else if (resp === 'CONTRADICAO') {
      this.resposta.classes.contradicao = { 'select-contradicao': true };
      this.resposta.classes.tautologia = { 'select-tautologia': false };
      this.passos.setFinalizar(Resposta.contradicao);
    }
  }
  onResposta() {
    this.eventConfirm.emit(this.passos.getFinalizar());
  }
}
