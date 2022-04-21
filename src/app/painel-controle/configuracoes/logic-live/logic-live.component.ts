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
  msgErro='';
  msgSucesso='...';
  buscando =true;
  sincronizados = false
  constructor( private service: ConfiguracaoService ) { }

  ngOnInit(): void {
    this.service.configuracoes().subscribe(
      response=>{
        this.buscando=false
        if(response['success']){
          this.msgSucesso = response['msg'];
          this.sincronizados = response['data']['sincronizados'];
        }
        else{
          this.msgErro = response['data']['msg'];
        }
      },
      error  =>{
        this.buscando=false
        this.msgErro = error.error.msg
      }
    )
  }

  criarGameEndModulos(){
    this.buscando=true
    this.service.criarModuloEndGame().subscribe(
      response=>{
        this.buscando=false
        if(response['success']){
          this.sincronizados = true
          this.msgSucesso =response['msg']
        }
        else{
          // error
        }
      }
    )
  }

  limparGameEndModulos(){
    this.buscando=true
    this.service.limparModuloEndGame().subscribe(
      response=>{
        this.buscando=false
        if(response['success']){
          this.msgSucesso =response['msg']
          this.msgErro='';
        }
        else{
          // error
        }
      }
    )
  }
}
