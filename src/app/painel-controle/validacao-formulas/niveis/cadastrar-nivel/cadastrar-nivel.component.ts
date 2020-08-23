import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Niveis } from 'src/app/painel-controle/models/niveis.model';
import { NiveisService } from '../niveis.service';
import { Router } from '@angular/router';

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
  ) { }


  ngOnInit(): void {
    this.nivel = new Niveis(null,null,null,null,true,null,null);
    this.loadingRecompensa=true
    this.service.todasRecompensas().subscribe(
      recompensas=> this.carregacomboRecompensas(recompensas),
      error=>this.errorBuscaRecompensas()
    );
  }


  cadastrarNivel(){
    this.requisitando=true
    this.spineer=true

    this.service.cadastrar(this.nivel).subscribe(
      response=> this.sucessoCadastro(response),
      error=>this.errorCadastro(error)
    );
  }

  sucessoCadastro(response){
    this.requisitando=false
    this.spineer=false
    this.router.navigate(['/painel/modulo1/niveis'])

  }
  errorCadastro(response){
    this.spineer=false
    this.erroSalvar=response.message

  }


  carregacomboRecompensas(recompensas){
    this.listaRecompensas = recompensas
    this.loadingRecompensa =false;
  }

  errorBuscaRecompensas(){
    this.listaRecompensas=['ERROR AO CARREGAR!']
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
