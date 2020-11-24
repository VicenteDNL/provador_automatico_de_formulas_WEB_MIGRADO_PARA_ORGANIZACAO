import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regras-gramlogic',
  templateUrl: './regras-gramlogic.component.html',
  styleUrls: ['./regras-gramlogic.component.css']
})
export class RegrasGramlogicComponent implements OnInit {

  modulos ={
    'conectivos': true,
    'negacao': false,
    'letra': false,
    'conclusao': false,
    'premissas': false,

  };

  constructor() { }

  ngOnInit(): void {
  }


  abrirInfo(info){

    this.modulos.conectivos =false
    this.modulos.negacao =false
    this.modulos.letra =false
    this.modulos.conclusao =false
    this.modulos.premissas =false

    switch(info){
      case 'conectivos':
        this.modulos.conectivos =true
        break;
      case 'negacao':
        this.modulos.negacao =true
        break;
      case 'letra':
        this.modulos.letra =true
        break;
      case 'conclusao':
        this.modulos.conclusao =true
        break;
      case 'premissas':
        this.modulos.premissas =true
        break;
      default:
        this.modulos.conectivos =true


    }
    this.modulos
  }

}
