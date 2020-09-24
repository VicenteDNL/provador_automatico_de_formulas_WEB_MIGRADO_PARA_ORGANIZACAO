import { Component, OnInit } from '@angular/core';
import { ExerciciosService } from '../exercicios/exercicios.service';
import { PainelControleComponent } from '../../painel-controle.component';


declare var gramLogic: any;


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  xml
  listaImpressaoNo
  listaImpressaoAresta
  constructor( 
            private service: ExerciciosService,
            private painelCmp: PainelControleComponent
  ) { }

  ngOnInit(): void {

    var validacao = gramLogic.validar('P|-(P^P)',false)

    if(validacao['sucesso']==true){
      
      this.service.arvoreOtimizada(validacao['xml'],200).subscribe(
            response=> {
              this.listaImpressaoNo=response['data']['impresao']['nos'];
              this.listaImpressaoAresta=response['data']['impresao']['arestas'];
            },
            error=>{
              this.errorMensagem(error.message)
            }
          );
    }
    else{
      this.errorMensagem('Error na geração da árvore!!')
    }
  }


  errorMensagem(msg){
    this.painelCmp.errorMensagen = msg;
  }

}
