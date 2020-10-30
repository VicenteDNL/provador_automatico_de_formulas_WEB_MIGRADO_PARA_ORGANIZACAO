import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PainelControleComponent } from '../../painel-controle.component';
import { ConfiguracaoService } from '../configuracao.service';

@Component({
  selector: 'app-logic-live',
  templateUrl: './logic-live.component.html',
  styleUrls: ['./logic-live.component.css']
})
export class LogicLiveComponent implements OnInit {

  check=faCheck;
  times=faTimes
  cadastrados=false;
  constructor( private service: ConfiguracaoService ) { }

  ngOnInit(): void {
    this.service.configuracoes().subscribe(
      response=>{
        if(response['success']){
          this.cadastrados=response['data']['cadastrados'];

        }
        else{
          // error
        }
      }
    )
  }

  criarGameEndModulos(){
    this.service.criarModuloEndGame().subscribe(
      response=>{
        if(response['success']){
          this.cadastrados=response['data']['cadastrados'];

        }
        else{
          // error
        }
      }
    )
  }

}
