import { Component, OnInit } from '@angular/core';
import { PainelControleComponent } from '../painel-controle.component';

@Component({
  selector: 'app-estudo-conceitos',
  templateUrl: './estudo-conceitos.component.html',
  styleUrls: ['./estudo-conceitos.component.css']
})
export class EstudoConceitosComponent implements OnInit {

  constructor(private painel: PainelControleComponent) { }

  ngOnInit(): void {
    // this.painel.animacaoIniciar();
  }

  ngAfterViewInit() {
    // this.animacaoIniciar()0
  }

  animacaoIniciar(){
 console.log();
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

