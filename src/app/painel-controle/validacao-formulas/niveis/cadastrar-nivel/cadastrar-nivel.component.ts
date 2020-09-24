import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Niveis } from 'src/app/painel-controle/models/niveis.model';
import { NiveisService } from '../niveis.service';
import { Router } from '@angular/router';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';

@Component({
  selector: 'app-cadastrar-nivel',
  templateUrl: './cadastrar-nivel.component.html',
  styleUrls: ['./cadastrar-nivel.component.css']
})
export class CadastrarNivelComponent implements OnInit {
  iconVoltar= faArrowAltCircleLeft;
  iconFechar=faTimes;
  listaRecompensas=[]
  loadingRecompensa=false
  nivel:Niveis
  semRecompensa=true;
  requisitando=false;
  spineer=false
  erroSalvar=null;
  constructor(
              private service: NiveisService,
              private router:Router,
              private painelCmp:PainelControleComponent
  ) { }


  ngOnInit(): void {
    this.nivel = new Niveis(null,null,null,null,true,null,null);
    this.loadingRecompensa=true
    this.service.todasRecompensas().subscribe(
      recompensas=> this.carregacomboRecompensas(recompensas),
      error=>this.errorBuscaRecompensas(error.message)
    );
  }


  cadastrarNivel(){
    this.requisitando=true
    this.spineer=true

    this.service.cadastrar(this.nivel).subscribe(
      response=> this.sucessoCadastro(response),
      error=>this.errorCadastro(error.message)
    );
  }

  sucessoCadastro(response){
    this.requisitando=false
    this.spineer=false
    if(response['success']==true){
      this.router.navigate(['/painel/modulo1/niveis'])
    }
    else{
      this.painelCmp.errorMensagen=response['msg']
    }
   
    

  }
  errorCadastro(error){
    this.spineer=false
    this.painelCmp.errorMensagen=error

  }


  carregacomboRecompensas(recompensas){
    this.loadingRecompensa =false;
    if(recompensas['success']==true){
      console.log(recompensas['data']);
      this.listaRecompensas = recompensas['data']
    
    }
    else{
      this.painelCmp.errorMensagen=recompensas['msg']
    }    
  }

  errorBuscaRecompensas(error){
    this.painelCmp.errorMensagen=error
  }

  recompensaDesbilita(){

    if(this.semRecompensa==false){
      this.nivel.id_recompensa=undefined;
    }
  }

  fecharAvisoError(){
    this.erroSalvar=null;
    this.requisitando=false
  }

}
