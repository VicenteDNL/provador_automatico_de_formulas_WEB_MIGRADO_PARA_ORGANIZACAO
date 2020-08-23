import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PainelControleComponent } from '../painel-controle.component';


@Component({
  selector: 'app-validacao-formulas',
  templateUrl: './validacao-formulas.component.html',
  styleUrls: ['./validacao-formulas.component.css'],
 
})
export class ValidacaoFormulasComponent implements OnInit {


  constructor(private router: Router, private painel: PainelControleComponent) { }

  ngOnInit(): void {
    // this.painel.animacaoIniciar();
  }

  ngAfterViewInit() {
    // this.animacaoIniciar();
  }

  animacaoIniciar(){

    var cordeNav =  document.getElementById('barra-navegacao').getBoundingClientRect().left, 
        eleItem=document.getElementsByClassName("navegacao-ativa")[0],
        item = eleItem.getBoundingClientRect().left - cordeNav;
    var  metadeTamanhoItem =eleItem.getBoundingClientRect().width/2,
        metadeTamanhoBarra =  document.getElementById('barra-ativa-interna').getBoundingClientRect().width/2,
        centralizar = item + (metadeTamanhoItem-metadeTamanhoBarra)
document.getElementById('barra-ativa-interna').style.transform = "translateX("+centralizar+"px)";


    // -----------------------------------
  }


  

}
