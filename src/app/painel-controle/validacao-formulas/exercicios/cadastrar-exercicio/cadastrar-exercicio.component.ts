import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Exercicio } from 'src/app/painel-controle/models/exercicio.model';
import { ExerciciosService } from '../exercicios.service';
import { Router } from '@angular/router';
import { Recompensa } from 'src/app/painel-controle/models/recompensa.model';
import { Niveis } from 'src/app/painel-controle/models/niveis.model';
import { Formula } from 'src/app/painel-controle/models/formula.model';

@Component({
  selector: 'app-cadastrar-exercicio',
  templateUrl: './cadastrar-exercicio.component.html',
  styleUrls: ['./cadastrar-exercicio.component.css']
})
export class CadastrarExercicioComponent implements OnInit {

  iconVoltar= faArrowAltCircleLeft;
  iconFechar=faTimes;
  listaRecompensas=[]
  loadingRecompensa=false
  exercicio:Exercicio
  requisitando=false;
  spineer=false
  erroSalvar=null;
  tempoDesbilita=false
  constructor(
              private service: ExerciciosService,
              private router:Router,
  ) { }


  ngOnInit(): void {
    this.exercicio = new Exercicio(null,new Recompensa() ,new Niveis(),new Formula(),null,null,null,null,null,null,null,null,null,);
    this.loadingRecompensa=true
    this.service.todasRecompensas().subscribe(
      recompensas=> this.carregacomboRecompensas(recompensas),
      error=>this.errorBuscaRecompensas()
    );
  }


  cadastrarNivel(){
    console.log( this.exercicio)
    // this.requisitando=true
    // this.spineer=true

    // this.service.cadastrar(this.exercicio).subscribe(
    //   response=> this.sucessoCadastro(response),
    //   error=>this.errorCadastro(error)
    // );
  }

  sucessoCadastro(response){
    this.requisitando=false
    this.spineer=false
    this.router.navigate(['/painel/modulo1/exercicio'])

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

  tempoDesbilitar(){

    if(this.tempoDesbilita==false){
      this.exercicio.tempo=undefined;
    }
  }

  fecharAvisoError(){
    this.erroSalvar=null;
    this.requisitando=false
  }

}
